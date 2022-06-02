import { expect } from "chai";
import Database from "../database";

describe("Database", () => {
    let db = new Database();

    it("Should open 'test.json'", async() => {
        bSuccess = await db.open("test.json");
        expect(bSuccess).to.be.true;
    });

    describe("#get", () => {
        it("'name' should be 'Celestial'", () => {
            let value = db.get("name");
            expect(value).to.equal("Celestial");
        });

        it("'description' should be ''", () => {
            let value = db.get("description");
            expect(value).to.equal("");
        });

        it("'data' should be an object", () => {
            let value = db.get("data");
            expect(value).to.be.an("object");
        });
    });

    describe("#set", () => {
        it("Setting 'version' to '1.0.0'", () => {
            db.set("version", "1.0.0");
            let value = db.get("version");
            expect(value).to.be("1.0.0");
        });
    });
});


/*
- Database should be able to open a file (parsing)
- Database should be able to save a file
- Database#get should return the correct values
- Database#set should set the correct values (read after write)
*/