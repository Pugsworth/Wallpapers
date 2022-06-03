import { Database } from "../database/Database.js";
import { expect } from "chai";

describe("Database", () => {
    let db = new Database();

    it("Should open 'test.json'", async() => {
        let bSuccess = await db.open("./test/test.json");
        expect(bSuccess).to.be.true;
    });

    describe("#get", () => {
        it("'name' should be 'Celestial'", async () => {
            let value = await db.get("/name");
            expect(value).to.equal("Celestial");
        });

        it("'description' should be ''", async () => {
            let value = await db.get("/description");
            expect(value).to.equal("");
        });

        it("'data' should be an object", async () => {
            let value = await db.get("/data");
            expect(value).to.be.an("object");
        });
    });

    describe("#set string", () => {
        it("Setting 'version' to '1.0.0'", async () => {
            db.set("/version", "1.0.0");
            let value = await db.get("/version");
            expect(value).to.equal("1.0.0");
        });
    });

    describe("#set object", () => {
        it("Setting 'data_test' to {'test': 'test'}", async () => {
            db.set("/data_set", { test: "test" });
            let value = await db.get("/data_set");
            expect(value).to.deep.equal({ test: "test" });
        });

        it("remove 'data_test'", () => {
            expect(async () => {
                await db.delete("/data_set");
            }).to.not.Throw;
        });
    });

    describe("#set array", () => {
        it("Setting 'data_test' to [1, 2, 3]", async () => {
            db.set("/data_set", [1, 2, 3]);
            let value = await db.get("/data_set");
            expect(value).to.deep.equal([1, 2, 3]);
        });

        it("remove 'data_test'", () => {
            expect(async () => {
                await db.delete("/data_set");
            }).to.not.Throw;
        });
    });

    describe("#delete 'version'", () => {
        it("Deleting 'version'", async () => {
            db.delete("/version");
            expect(async () => {
                let value = await db.get("/version");
            }).to.Throw;
        });
    });

    // TODO: This is volatile, and should be tested in a different way
    describe("#save", () => {
        it("Saving the database", async () => {
            // currently doesn't really have a return value or anything
            expect(() => {
                db.save();
            }).to.not.Throw;
        });
    });
});


/*
- Database should be able to open a file (parsing)
- Database should be able to save a file
- Database#get should return the correct values
- Database#set should set the correct values (read after write)
*/