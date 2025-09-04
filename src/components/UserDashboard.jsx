import { Box, Heading, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import { useAppContext } from "../context/appContext";

export default function UserDashboard() {
  const { username } = useAppContext();
  const [investments, setInvestments] = useState([]);

  useEffect(() => {
    const fetchInvestments = async () => {
      const { data, error } = await supabase
        .from("investments")
        .select()
        .eq("user", username);
      if (!error) setInvestments(data || []);
    };
    if (username) fetchInvestments();
  }, [username]);

  return (
    <Box p="4">
      <Heading size="md" mb="4">
        Your Portfolio
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Asset</Th>
            <Th isNumeric>Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {investments.map((inv) => (
            <Tr key={inv.id}>
              <Td>{inv.asset}</Td>
              <Td isNumeric>{inv.amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
}
