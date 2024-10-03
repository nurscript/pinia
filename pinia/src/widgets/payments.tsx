import { useEffect, useState } from 'react'

import { collection, getDocs } from 'firebase/firestore'
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
  timestamp: string;
  bank: string;
  price: string;
  approved: boolean;
}

const data: DataItem[] = [
  {
    id: 1,
    name: "John Doe",
    photo: "https://via.placeholder.com/150",
    timestamp: "2024-10-03 10:00:00",
    bank: "Bank A",
    price: "$500",
    approved: true,
  },
  {
    id: 2,
    name: "Jane Smith",
    photo: "https://via.placeholder.com/150",
    timestamp: "2024-10-03 12:00:00",
    bank: "Bank B",
    price: "$300",
    approved: false,
  },
];

function ListWidget()  {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [list, setList] = useState<any[]>([]);
  useEffect(()=> {
    const fetchList = async () => {
      const querySnapshot = await getDocs(collection(db, 'payment'));
      const fetchedList = querySnapshot.docs.map(doc => doc.data());
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
                    <strong>Timestamp:</strong> {item.timestamp}
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