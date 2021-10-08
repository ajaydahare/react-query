import React, { useState } from "react";
import { useMutation, useQuery } from "react-query";
import client from "./queryClient";

const fetcher = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

function App() {
  const [addRecord, setAddRecord] = useState("");
  const mutation = useMutation(
    (body) => fetcher("http://localhost:5000/api/add-record", body),
    {
      onSuccess(data) {
        console.log("got response from backend", data);
        client.invalidateQueries("records");
      },
      onError(error) {
        console.log("got error from backend", error);
      },
    }
  );

  function callMutation() {
    mutation.mutate({ record: addRecord });
    setAddRecord("");
  }

  const { data: records, isLoading } = useQuery(
    "records",
    () => {
      return fetch("http://localhost:5000/api/get-records").then((res) =>
        res.json()
      );
    },
    {
      select: (data) => data.records,
    }
  );

  if (isLoading) {
    return <h2>Loading......</h2>;
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Simple App</h1>
      <div>
        {records.map((record, i) => {
          return <p key={i}>{record}</p>;
        })}
      </div>
      <input
        type="text"
        value={addRecord}
        onChange={(e) => setAddRecord(e.target.value)}
      />
      <button onClick={callMutation}>submit</button>
    </div>
  );
}

export default App;
