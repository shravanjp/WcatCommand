# WcatCommand
This project is about the wcat command, by which we can perform various file operation

## Usage

To remove the spaces from the file, if that contains more spaces.
You can give any number of files

```bash
wcat -s file_names
```

To give numbers on the beginning of every line

```bash
wcat -n file_names
```

To remove the spaces present in the file, and give numbers in the begginning of every line after removing the spaces

```bash
wcat -b file_names
```

To replace the file content with the content of other files

```bash
wcat source_file_names > destination -file
```

To append the file content with the content of other files

```bash
wcat source_file_names >> destination -file
```

