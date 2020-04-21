import React, { useState } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";

const Form = styled.form`
  display: flex;
  align-items: center;
  padding-right: 30px;
`;

const Icon = styled.i`
  padding-right: 7px;
  padding-top: 3px;
`;

const Input = styled.input`
  all: unset;
  font-size: 16px;
  width: 100%;
`;

const SearchInput = withRouter(({ history: { push } }) => {
  const [term, setTerm] = useState("");
  const handleChange = (e) => {
    const {
      currentTarget: { value },
    } = e;
    setTerm(value);
  };
  const searchByTerm = (term) => {
    push({ pathname: "/search", state: { term } });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (term !== "") {
      searchByTerm(term);
    }
    setTerm("");
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Icon className="fas fa-search" />
      <Input
        type="text"
        placeholder="search.."
        value={term}
        onChange={handleChange}
      />
    </Form>
  );
});

export default SearchInput;
