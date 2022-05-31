# Provider Interface

This is the interface for a provider.

## Properties
    name: String
        The name of the provider.
        This is the name referenced in the configuration file.
        This way, the filename can be anything.

---

## Methods

### getPrefix(url: String): String
    Return the prefix of the provider.
    This defaults to the name, but can be overridden in special cases.

### getIdentifier(url: String): String
    Returns the identifier for the given url.
    This is used for the url to identifier mapping.
    e.g. Thumbs are identified by their provider and id.

### getThumbnailURL(url: String): String
    Return the thumbnail url for the given url.
    This is used to pass the thumbnail to the downloader.

### getWallpaper(url: String): String
    Return the wallpaper url for the given url.
    This is used to pass the wallpaper to the downloader.

### getMetadata(url: String): JSON<Metadata>
    Return the metadata for the given url.
    This is used to store the metadata in the database.
