import {
  Badge,
  Group,
  Title,
  Text,
  Card,
  SimpleGrid,
  Container,
  rem,
  useMantineTheme,
  Button,
} from '@mantine/core';
import { IconGauge, IconUser, IconCookie } from '@tabler/icons-react';
import classes from './BookSelection.module.css';
import { useEffect, useState } from 'react';

import BookList from '@/components/RWS/BookSelection/BookList';
import UploadYours from '@/components/RWS/UploadYours';
import { createContext } from 'react';
import { useContext } from 'react';

import StateContext from "@/context/bookStateContext";

const mockdata = [
  {
    title: 'Extreme performance',
    description:
      'This dust is actually a powerful poison that will even make a pro wrestler sick, Regice cloaks itself with frigid air of -328 degrees Fahrenheit',
    icon: IconGauge,
  },
  {
    title: 'Privacy focused',
    description:
      'People say it can run at the same speed as lightning striking, Its icy body is so cold, it will not melt even if it is immersed in magma',
    icon: IconUser,
  },
  {
    title: 'No third parties',
    description:
      'They’re popular, but they’re rare. Trainers who show them off recklessly may be targeted by thieves',
    icon: IconCookie,
  },
];



interface Book {
  id: number;
  title: string;
  fileName: string;
  // Add other properties of the book object here
}


interface BookSelectionArray {
  books: Book[]; // Array of Book objects
}

// export const getStaticProps = async () => {
//   const res = await fetch("http://127.0.0.1:5000/books/");
//   const data = await res.json();

//   console.log(data,"abid here");
//   console.log("abid here");
//   console.log("abid here");


//   return {
//     props: {
//       BookList: data,
//     },
//   };
// };




const BookSelection = () => {

  const [data, setData] = useState<Book[]>([]);

  const { state, setState } = useContext(StateContext);


  useEffect(() => {
    // Fetch data when the component mounts
    fetchData();
  }, []);


  useEffect(() => {
    if (state) {
      fetchData();
      // Execute function to set state to false
      setState(false);
    }
  }, [state, setState]);




  const fetchData = async () => {
    try {

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/books`);
      // .catch(() => fetch("http://127.0.0.1:5000/books"));

      const data: Book[] = await res.json();
      setData(data);
    } catch (error) {
      console.error(" abid Error fetching data:", error);
    }
  };

  //sending this to child component. so when delete happend; so it can retun the callback function back here to fetch the data again
  const handleChildClick = () => {
    fetchData();
  };

  //sending this to child component. so when delete happend; so it can retun the callback function back here to fetch the data again



  const theme = useMantineTheme();
  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} padding="xl">
      <feature.icon
        style={{ width: rem(50), height: rem(50) }}
        stroke={2}
        color={theme.colors.blue[6]}
      />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (

    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          1. Selection Mode
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
      Select a book or material that interests you, or upload your own above.
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
      Choosing the right material is crucial. We ensure to provide the best, easy-to-read content that keeps you engaged.
      </Text>



      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {data.map((book) => (
          < BookList key={book.id} book={book} onClick={handleChildClick} />
        ))}
      </SimpleGrid>

      {/* <Button variant="danger">Danger variant</Button> */}


{/* 
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid> */}
    </Container>
  );
}

export default BookSelection;