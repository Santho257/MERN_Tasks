import React, { useContext, useEffect, useMemo, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { BASE_URL } from "../../constants";
import { Outlet, useParams } from "react-router-dom";
import ExpenseData from "./ExpenseData/ExpenseData";
import Section from "../../ui/Section/Section";
import EntryExpense from "./EntryExpense/EntryExpense";
import { useFetch } from "../../hooks/useFetch";
import Title from "../../ui/Title/Title";
import Table, { TD, TH } from "../../ui/Table/Table";
import Paginator from "../Pagination/Paginator";

const ExpenseTable = () => {
  const { user } = useContext(AuthContext);
  const { explistId } = useParams();
  const [count, setCount] = useState(0);

  const [expenses, , errors1] = useFetch(
    `${BASE_URL}/expenses/explists/${explistId}`,
    { Authorization: user.token },
    [],
    [count]
  );
  const [listData, , errors2] = useFetch(
    `${BASE_URL}/explists/${explistId}`,
    { Authorization: user.token },
    {},
    [count]
  );

  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 10;
  const totalPages = Math.ceil(expenses.length / recordPerPage);
  const [filteredExpense, setFilteredExpense] = useState([]);

  useEffect(() => {
    const start = (Math.min(totalPages, currentPage) - 1) * recordPerPage;
    const end = Math.min(expenses.length, start + recordPerPage);
    setFilteredExpense([...expenses.slice(start, end).map((expense, i) => ({ ...expense, sNo: start + i + 1 }))]);
  }, [expenses, currentPage])

  const findTotalExpense = useMemo(() => {
    const total = expenses.reduce(
      (total, expense) => parseInt(total) + parseInt(expense.amount),
      0
    );
    return total;
  }, [expenses]);

  return (
    <Section>
      <Title>{listData?.title}</Title>
      <Table>
        <thead>
          <tr>
            <TH>S.No</TH>
            <TH>Source</TH>
            <TH>Category</TH>
            <TH>Date</TH>
            <TH>Amount</TH>
          </tr>
        </thead>
        <tbody>
          <ExpenseData expenses={filteredExpense} />
          {currentPage == totalPages &&
            <>
              <tr>
                <TD>{expenses.length + 1}</TD>
                <EntryExpense setCount={setCount} />
              </tr>
              <tr>
                <TD colSpan={4} style={{ textAlign: "right" }}>Total</TD>
                <TD>
                  {findTotalExpense.toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    currencyDisplay: "symbol",
                  })}
                </TD>
              </tr>
            </>}
        </tbody>
      </Table>
      <Paginator currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages} />
    </Section>
  );
};

export default ExpenseTable;
