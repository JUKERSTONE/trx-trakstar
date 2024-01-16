import {useFirebase} from '../../firebase';

const {handleRetrieveChats1} = useFirebase();
export const handleChats = async () => {
  handleRetrieveChats1();
};
