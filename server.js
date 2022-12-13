// @ts-check

const { Client } = require("pg");
const express = require("express");
const app = express();
const port = 8080;

const client = new Client({
  password: "root",
  user: "root",
  host: "postgres",
});

app.use(express.static("public"));

app.get("/test", async (req, res) => {
  res.status(200);
  res.send("Hello World!");
});

app.get("/employees", async (req, res) => {
  const results = await client
    .query("SELECT * FROM employees")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get("/users", async (req, res) => {
  const results = await client
    .query("SELECT name,email,id FROM users")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get("/users/:id", async (req, res) => {
  const results = await client
    .query("SELECT name,email,id FROM users\
            WHERE users.id = $1", [req.params.id])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.delete("/users/:id", async (req, res) => {
  const results = await client
    .query("DELETE FROM users\
            WHERE users.id = $1", [req.params.id])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

// app.post("/users", async (req, res) => {

app.put("/users/:id", async (req, res) => {
  const results = await client
    .query("UPDATE name,email,id FROM users\
            WHERE users.id = $1", [req.params.id])
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get("/events", async (req, res) => {
  const results = await client
    .query("SELECT * FROM events")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get("/participants", async (req, res) => {
  const results = await client
    .query("SELECT * FROM participants")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get("/events_and_participants", async (req, res) => {
  const results = await client
    .query("SELECT * FROM events \
    LEFT JOIN participants ON events.id = participants.event_id")
    .then((payload) => {
      return payload.rows;
    })
    .catch((err) => {
      console.warn(err);
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

app.get("/users_and_invited_events", async (req, res) => {
  const results = await client
    .query("SELECT name,email,users.id, array_agg(events.title) as participating_events \
    FROM users \
    LEFT JOIN participants ON users.id = participants.user_id \
    LEFT JOIN events ON participants.event_id = events.id \
    GROUP BY users.id")
    .then((payload) => {
      return payload.rows;
    })
    .catch(() => {
      throw new Error("Query failed");
    });
  res.setHeader("Content-Type", "application/json");
  res.status(200);
  res.send(JSON.stringify(results));
});

(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})();

const myPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo");
  }, 300);
  reject("oops");
});

// myPromise.then(() => {
//   console.log("hello");
// });
