import Head from "next/head";
import { Inter } from "next/font/google";
import Table from "react-bootstrap/Table";
import { Alert, Container } from "react-bootstrap";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AMOUNT, PAGINATION } from "@/constants/constants";
import { getOffset, getTotalPagesAmount } from "@/utils/paginationUtils";
import { Pagination } from "@/components/Pagination/Pagination";

const inter = Inter({ subsets: ["latin"] });

type TUserItem = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  updatedAt: string;
};

type TGetServerSideProps = {
  statusCode: number;
  users: TUserItem[];
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext): Promise<{ props: TGetServerSideProps }> => {
  try {
    const { query } = ctx;

    const { limit = PAGINATION.BUYERS.LIMIT, offset = 0 } = query;

    const res = await fetch(`http://localhost:3001/users?limit=${limit}&offset=${offset}`, { method: "GET" });
    if (!res.ok) {
      return { props: { statusCode: res.status, users: [] } };
    }

    return {
      props: { statusCode: 200, users: await res.json() },
    };
  } catch (e) {
    return { props: { statusCode: 500, users: [] } };
  }
};

export default function Home({ statusCode, users }: TGetServerSideProps) {
  const [page, setPage] = useState(1);

  const router = useRouter();

  const totalPages = getTotalPagesAmount();

  useEffect(() => {
    const params = new URLSearchParams({ offset: getOffset(page).toString() });
    router.replace(`/?${params.toString()}`);
  }, [page]);

  if (statusCode !== 200) {
    return <Alert variant={"danger"}>Ошибка {statusCode} при загрузке данных</Alert>;
  }

  const setPageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };

  return (
    <>
      <Head>
        <title>Тестовое задание</title>
        <meta name="description" content="Тестовое задание" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={inter.className}>
        <Container>
          <h1 className={"mb-5"}>Пользователи</h1>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Телефон</th>
                <th>Email</th>
                <th>Дата обновления</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td>{user.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination currentPage={page} setPageChange={setPageChange} maxPages={totalPages} />
        </Container>
      </main>
    </>
  );
}
