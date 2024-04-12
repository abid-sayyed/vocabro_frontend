import { IconBookmark, IconHeart, IconShare } from '@tabler/icons-react';
import {
  Card,
  Image,
  Text,
  ActionIcon,
  Badge,
  Group,
  Center,
  Avatar,
  useMantineTheme,
  rem,
} from '@mantine/core';
import classes from './BookList.module.css'
import Link from 'next/link';
import PdfReader from '@/components/RWS/Read/pdfReader';
import { useContext, useState } from 'react';
import PdfContext from '@/context/PdfContext';
import { useEffect } from 'react';

interface Book {
  title: string;
  fileName: string;
  id: number;
}

export function BookList({ book, onClick }: { book: Book; onClick: () => void }) {




  const linkProps = { href: '/RWS/ReadMode', rel: 'noopener noreferrer' };
  const theme = useMantineTheme();

  const { setPdf } = useContext(PdfContext);

  const loadTheBook = async (bookId: Number) => {
    try {
      const res = await fetch(`http://127.0.0.1:5000/books/getbookpdf/${bookId}`)
      .catch(() => fetch('https://https://vocabro.pythonanywhere.com/books/getbookpdf/${bookId}'));

      console.log("hello ji2", res);
      if (!res.ok) {
        throw new Error('Failed to fetch book');
      }

      const bookData = await res.blob();
      const bookurl = window.URL.createObjectURL(bookData);
      console.log("cur url", bookurl);

      setPdf(bookurl);

      console.log('Loaded Book:', bookData);
    } catch (error) {
      console.error('Error loading the book:', error);
    }
  };







  const handleDeleteClick = async (book: number) => {    try {
      // Send a DELETE request to the Flask server to delete the book with the specified ID
      const response = await fetch(`http://127.0.0.1:5000/books/${book}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to delete book');
      }
  
      console.log("Book deleted successfully");
      onClick();
    } catch (error) {
      console.error('There was a problem with the delete request:', error);
    }
  }





  return (
    <Card withBorder radius="md" className={classes.card}>
      <Card.Section>
        <Link {...linkProps}
       onClick={() => loadTheBook(book.id)}
        >
          {/* <Image src="https://i.imgur.com/Cij5vdL.png"  alt="Description of the image" height={180} /> */}
          <Image src="/book/pdfthumb.png"  alt="Description of the image" height={180} />

        </Link>
      </Card.Section>
{/*  */}
      <Badge className={classes.rating} variant="gradient" gradient={{ from: 'yellow', to: 'red' }}>
        outstanding
      </Badge>

      <Text className={classes.title} fw={500} component="a" {...linkProps}>
        {book.title}
      </Text>

      <Text fz="sm" c="dimmed" lineClamp={4}>
        Resident Evil Village is a direct sequel to 2017’s Resident Evil 7, but takes a very
        different direction to its predecessor, namely the fact that this time round instead of
        fighting against various mutated zombies, you’re now dealing with more occult enemies like
        werewolves and vampires.
      </Text>

      <Group justify="space-between" className={classes.footer}>
        <Center>
          <Avatar
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
            size={24}
            radius="xl"
            mr="xs"
          />
          <Text fz="sm" inline>
            Abids
          </Text>
        </Center>


        <Group gap={8} mr={0}>
          <ActionIcon className={classes.action} onClick={() => handleDeleteClick(book.id)}>
            <div >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-trash">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 7l16 0" />
                <path d="M10 11l0 6" /><path d="M14 11l0 6" />
                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
              </svg>
            </div>
          </ActionIcon>
        </Group>
      </Group>
    </Card>
  );
}

export default BookList;