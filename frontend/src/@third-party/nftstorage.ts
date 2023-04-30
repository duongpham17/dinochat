import { NFTStorage } from 'nft.storage';

const api_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDcxNzk5REQwRjAxYjJFQjE2ZkM5NDBlOTUyQzk3ZmE5ZDI3OUI1QTIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MjYwMjIxNjYzMCwibmFtZSI6InFpa3NoYXJlIn0.amMmImmY07gy3v8myxsh538R5BXixDmJHZL887oDhXE"

export const upload = async (image: any): Promise<{ url: string; ipfs: string}> => {
    const storage = new NFTStorage({ token: api_key || "" });
    const blob = new Blob([image]);
    const cid = await storage.storeBlob(blob);
    return {
        url: `ipfs://${cid}`,
        ipfs: cid
    }
};

export const remove = async (cid: string): Promise<void> => {
    try{
        const storage = new NFTStorage({ token: api_key || "" });
        await storage.delete(cid);
    } catch(err: any){
        console.log(err.response)
    }
};