import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";

export default function AdminDashboard() {
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      const { data, error } = await supabase.from("investments").select();
      if (!error) setInvestments(data || []);
    };
    fetchInvestments();
  }, []);

  return (
    <Box p="4">
      <Heading size="md" mb="4">
        Admin Dashboard
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>Asset</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {investments.map((inv) => (
            <Tr key={inv.id}>
              <Td>{inv.user}</Td>
              <Td>{inv.asset}</Td>
              <Td isNumeric>{inv.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
