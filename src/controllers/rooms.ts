import { NextFunction, Response } from 'express';
import { logo } from '../@assets/logo';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';
import bcrypt from 'bcryptjs';
import Rooms from '../models/rooms';
import Messages from '../models/messages';

export const free = asyncBlock(async(req: Request, res: Response, next: NextFunction) => {

    const messages = await Messages.find().sort("-createdAt").limit(20);

    if(!messages) return next(new appError('Could not find any chat rooms', 400));

    return res.status(200).json({
        status: "success",
        data: messages
    })
});

export const search = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const rooms = await Rooms.find({name: {$regex: new RegExp(req.params.name, "i")}}).sort("-createdAt").limit(20);

    if(!rooms) return next(new appError('Could not find any rooms', 400));

    return res.status(200).json({
        status: "success",
        data: rooms
    });
});

export const chats = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const user_id = req.user._id;

    const chats = await Rooms.find({users: {$elemMatch: {user_id}}}).sort("-createdAt").limit(20);

    if(!chats) return next(new appError('Could not find any chat rooms', 400));

    return res.status(200).json({
        status: "success",
        data: chats
    })
});

export const room = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const room_id = req.params.id;

    const room = await Rooms.findById(room_id);

    if(!room) return next(new appError('Could not create room', 400));

    return res.status(200).json({
        status: "success",
        data: room
    })
});

export const create = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const [user, inputs] = [req.user, req.body];

    const password = inputs.password ? await bcrypt.hash(inputs.password, 12) : "";

    let room = await Rooms.create({
        name: inputs.name,
        password: password,
        image: logo[Math.floor(Math.random() * logo.length)],
        admin: user._id, 
        users: [{
            user_id: user._id, 
            name: user.name, 
            online: false,
            socket_id: "",
        }],        
        createdAt: new Date()
    });

    if(!room) return next(new appError('Could not create room', 400));

    return res.status(200).json({
        status: "success",
        data: room
    })
});

export const update = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const room = await Rooms.findByIdAndUpdate(req.body._id, req.body, {new: true});

    if(!room) return next(new appError('Could not create room', 400));

    return res.status(200).json({
        status: "success",
        data: room
    })
});

export const remove = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const room_id = req.params.id

    const room = await Rooms.findByIdAndDelete(room_id);

    if(!room) return next(new appError('Could not create room', 400));

    await Messages.deleteMany({room: room._id});

    return res.status(200).json({
        status: "success",
        data: room
    })
});

export const verify_public = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const {_id} = req.body;

    let room = await Rooms.findByIdAndUpdate(_id)

    if(!room) return next(new appError('Could not create room', 400));

    const new_user = { 
        name: req.user.name,
        user_id: req.user._id,
        online: true,
        socket_id: "",
    }

    const index = room.users.findIndex(el => el.user_id === new_user.user_id.toString());

    if(index === -1){
        room.users = [...room.users, new_user];
    } else {
        room.users[index] = new_user;
    };

    await room.save();

    return res.status(200).json({
        status: "success",
        data: room
    })
});


export const verify_private = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {
    const {_id, passwordCheck} = req.body;

    const room = await Rooms.findById(_id).select("+password");

    if(!room) return next(new appError('Could not create room', 400));

    const correct = await room.correctPassword(passwordCheck, room.password);

    if (!correct) return next(new appError("Incorrect password, try again", 401));

    room.users = [...room.users, {
        name: req.user.name,
        user_id: req.user._id,
        online: true,
        socket_id: "",
    }];

    await room.save();

    return res.status(200).json({
        status: "success",
        data: room
    })
});

