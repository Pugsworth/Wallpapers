// @purpose: Represents a value in a database that isn't a value type. This encompasses types like objects and arrays.
class DatabaseEntry
{
    // _value: {object|array}
    _value;
    _dbParent;



    // @purpose: Create a generator for the entries in this database entry
    *iter()
    {
    }

    // @purpose: Set the value of this database entry. This will report back to the database that this entry has changed.
    set(value)
    {
    }
}