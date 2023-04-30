import e, { NextFunction, Response } from 'express';
import { asyncBlock, appError } from '../@utils/helper';
import { InjectUserToRequest } from '../@types/models';

import Users from '../models/users';
import Rooms from '../models/rooms';
import Messages from '../models/messages';

export const update = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const rooms = await Users.findByIdAndUpdate(req.user._id, req.body, {new :true})

    if(!rooms) return next(new appError('Could not find any users', 400));

    return res.status(200).json({
        status: "success",
        data: rooms
    });
});

export const destroy = asyncBlock(async(req: InjectUserToRequest, res: Response, next: NextFunction) => {

    const rooms = await Rooms.find({admin: req.user._id});

    const [rooms_ids, messages_ids] = [rooms.map(el => el._id), rooms.map(el => el.id)];

    await Promise.all([    
        await Messages.deleteMany({room: {$in: messages_ids}}),
        await Rooms.deleteMany({_id: {$in: rooms_ids}}),
        await Users.findByIdAndDelete(req.user._id)
    ]);

    return res.status(200).json({
        status: "success",
    });
});