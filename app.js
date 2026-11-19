const express = require("express");

const app = express();
const registrations = [
    {
        id: 501,
        participantName: "Riya Sharma",
        eventName: "Tech Fest",
        department: "CSE",
        ticketCount: 2,
        paymentStatus: "Paid"
    },
    {
        id: 502,
        participantName: "Arjun Mehta",
        eventName: "Code Sprint",
        department: "IT",
        ticketCount: 1,
        paymentStatus: "Pending"
    },
    {
        id: 503,
        participantName: "Neha Verma",
        eventName: "Tech Fest",
        department: "ECE",
        ticketCount: 1,
        paymentStatus: "Paid"
    }
];

app.use(express.json());

function isValidRegistration(registration) {
    return (
        registration !== null &&
        typeof registration === "object" &&
        typeof registration.participantName === "string" &&
        registration.participantName.trim() !== "" &&
        typeof registration.eventName === "string" &&
        registration.eventName.trim() !== "" &&
        typeof registration.department === "string" &&
        registration.department.trim() !== "" &&
        Number.isInteger(registration.ticketCount) &&
        registration.ticketCount > 0 &&
        ["Paid", "Pending"].includes(registration.paymentStatus)
    );
}

app.get("/api/registrations", (req, res) => {
    res.status(200).json(registrations);
});

app.post("/api/registrations", (req, res) => {
    if (!isValidRegistration(req.body)) {
        return res.status(400).json({ message: "Invalid registration data" });
    }

    const registration = {
        id: Math.max(...registrations.map(({ id }) => id), 500) + 1,
        participantName: req.body.participantName.trim(),
        eventName: req.body.eventName.trim(),
        department: req.body.department.trim(),
        ticketCount: req.body.ticketCount,
        paymentStatus: req.body.paymentStatus
    };

    registrations.push(registration);
    return res.status(201).json(registration);
});

app.get("/api/registrations/filter", (req, res) => {
    const department = req.query.department;
    const matches = department
        ? registrations.filter(
              (registration) =>
                  registration.department.toLowerCase() === department.toLowerCase()
          )
        : [];

    res.status(200).json(matches);
});

app.get("/api/registrations/pending", (req, res) => {
    res.status(200).json(
        registrations.filter(
            (registration) => registration.paymentStatus === "Pending"
        )
    );
});

app.get("/api/registrations/:id", (req, res) => {
    const registration = registrations.find(
        ({ id }) => id === Number(req.params.id)
    );

    if (!registration) {
        return res.status(404).json({ message: "Registration not found" });
    }

    return res.status(200).json(registration);
});

app.put("/api/registrations/:id", (req, res) => {
    const index = registrations.findIndex(
        ({ id }) => id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Registration not found" });
    }

    if (!isValidRegistration(req.body)) {
        return res.status(400).json({ message: "Invalid registration data" });
    }

    registrations[index] = {
        id: registrations[index].id,
        participantName: req.body.participantName.trim(),
        eventName: req.body.eventName.trim(),
        department: req.body.department.trim(),
        ticketCount: req.body.ticketCount,
        paymentStatus: req.body.paymentStatus
    };

    return res.status(200).json(registrations[index]);
});

app.delete("/api/registrations/:id", (req, res) => {
    const index = registrations.findIndex(
        ({ id }) => id === Number(req.params.id)
    );

    if (index === -1) {
        return res.status(404).json({ message: "Registration not found" });
    }

    registrations.splice(index, 1);
    return res.status(200).json({ message: "Registration deleted successfully" });
});

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
        return res.status(400).json({ message: "Invalid JSON body" });
    }

    return next(error);
});

if (require.main === module) {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Event registration API listening on port ${port}`);
    });
}

module.exports = app;
