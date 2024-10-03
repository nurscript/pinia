import { useEffect, useState } from 'react'

import { collection, getDocs, Timestamp } from 'firebase/firestore'
import { db } from '../firebase'
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';

interface DataItem {
  id: number;
  name: string;
  photo: string;
  time: Timestamp | undefined;
  bank: string;
  price: string;
  approved: boolean;
}


function ListWidget() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [list, setList] = useState<DataItem[]>([]);
  useEffect(() => {
    const fetchList = async () => {
      const querySnapshot = await getDocs(collection(db, 'payment'));
      const fetchedList: DataItem[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Make sure to structure the data according to DataItem interface
        return {
          id: data.id,
          name: data.name,
          photo: data.photo,
          time: data.time,
          bank: data.bank,
          price: data.price,
          approved: data.approved,
        } as DataItem;
      });
      setList(fetchedList);
    };

    fetchList();
  }, []);


  const openModal = (imageSrc: string): void => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setSelectedImage(undefined);
    setIsModalOpen(false);
  };

  const parseTime = (time: Timestamp | undefined) => {
    if  (!(time instanceof Timestamp)) {
      return 'invalid'
    }
    const date = time.toDate();
    // Format the date and time
    const formattedDate = date.toLocaleDateString(); // e.g., "12/31/2023"
    const formattedTime = date.toLocaleTimeString(); // e.g., "12:00:00 PM"
    return formattedDate + ' - ' + formattedTime;
  }

  return (
    <Box sx={{ margin: '2rem auto', maxWidth: '600px', backgroundColor: '#fff', padding: '1rem', borderRadius: '8px', boxShadow: 3 }}>
      <Typography variant="h4" gutterBottom>
        Transactions
      </Typography>
      <List>
        {list.map((item) => (
          <ListItem key={item.id} alignItems="flex-start" sx={{ borderBottom: '1px solid #ddd' }}>
            <ListItemAvatar>
              <Avatar
                alt={item.name}
                src={item.photo}
                onClick={() => openModal(item.photo)}
                sx={{ cursor: 'pointer' }}
              />
            </ListItemAvatar>
            <ListItemText
              primary={<Typography variant="h6">{item.name}</Typography>}
              secondary={
                <>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Timestamp:</strong> {parseTime(item.time)}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Bank:</strong> {item.bank}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Price:</strong> {item.price}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={item.approved ? 'green' : 'red'}
                  >
                    <strong>Status:</strong> {item.approved ? 'Approved' : 'Not Approved'}
                  </Typography>
                </>
              }
            />
          </ListItem>
        ))}
      </List>

      {/* Modal Section */}
      <Dialog open={isModalOpen} onClose={closeModal}>
        <DialogTitle>Image Preview</DialogTitle>
        <DialogContent>
          {(
            <img src={selectedImage} alt="Large View" style={{ maxWidth: '100%', maxHeight: '100%' }} />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ListWidget;