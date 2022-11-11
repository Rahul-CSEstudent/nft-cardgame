import {ethers} from 'ethers';


import { ABI } from '../contract'

const AddNewEvent = async (eventFilter, provider, cb) => {
    provider.removeListener(eventFilter);

    provider.on(eventFilter, (logs) => {
        const parsedLogs = (new ethers.utils.Interface(ABI)).parseLog(logs) ;
        cb(parsedLogs);
    })
}

const createEventListener = () => {
    const NewPlayerEventFilter = contract.filters.NewPlayer();

    AddNewEvent(NewPlayerEventFilter, provider, ({ args }) => {
        console.log(args);

        if(walletAddress === args.owner){
            setShowAlert({
                status: true,
                type: 'success',
                message: 'You have successfully joined the game!'
            })
        }
    })
}

export default createEventListener;