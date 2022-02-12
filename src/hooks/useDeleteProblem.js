import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const useDeleteProblem = (id) => {
  const alert = useAlert();
  const deleteProb = async (id) => {
    await deleteDoc(doc(db, 'probs', id));
    const successAlert = alert.success('❌ 문제 삭제 완료', {
      timeout: 4000,
    });
  };

  return { deleteProb };
};

export default useDeleteProblem;
