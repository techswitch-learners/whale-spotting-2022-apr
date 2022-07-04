import React, { useState, FormEvent } from "react";

export const Sightingform: React.FunctionComponent = () => {
  const [date, setDate] = useState();

  const submit = (event: FormEvent) => {
    event.preventDefault();
    //alert(inputs);
  };
  return (
    <form>
      <fieldset>
        <label htmlFor="date">Enter date: </label>
        <input
          onChange={(event) => setDate(event.target.value)}
          type="text"
          id="date"
        />
        <br />
        <br />
        <button type="submit" onSubmit={(event) => console.log(event.target)}>
          Submit
        </button>
      </fieldset>
    </form>
  );
};
