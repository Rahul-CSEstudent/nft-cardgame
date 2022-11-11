import React, {useEffect, useState} from 'react';
import { PageHOC,CustomInput, CustomButton } from '../components';
import { useGlobalContext } from '../context';

const Home = () => {
  const { contract , walletAddress, setShowAlert } = useGlobalContext();
  const [playerName, setPlayerName] = useState('');


  const handleClick = async () => {
    try {
      const playerExists = await contract.isPlayer(walletAddress);

      if(!playerExists) {
        await contract.registerPlayer(playerName, playerName);

        setShowAlert({status: true, type: 'info', message: `${playerName} Registered Successfully`});
      }
    }catch(error){
      setShowAlert({
        status: true,
        type: 'failure',
        message: "Something went wrong, please try again later"
      })
    }
  }

  return (
    <div className='flex flex-col'>
      <CustomInput 
      label = "Name"
      placeholder= "Enter your Name"
      value= { playerName}
      handleValueChange = {setPlayerName}/>

      <CustomButton
      title = "register"
      handleClick = {handleClick}
      restStyles="mt-6"
      />

    </div>
  )
};

export default PageHOC(
  Home,
  <>Welocome to Dystopian<br/> a web3 play to learn and earn Platform</>,
  <>Connect your wallet to start playing <br/> the ultimate web3 Battle Games</>
  );