import { useEffect, useState } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActionArea,
} from '@mui/material';

function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      const productList = response.data;
      setProducts(productList);
    });
  });
  console.log('products***', products);

  return (
    <>
      <ImageList cols={3} sx={{ pl: 6 }}>
        {products.map((item: any) => (
          <Card sx={{ maxWidth: 350 }}>
            <CardActionArea>
              <CardMedia component="img" image={item.image} alt={item.title} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </ImageList>
    </>
  );
}

export default HomePage;
