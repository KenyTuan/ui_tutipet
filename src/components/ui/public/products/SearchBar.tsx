'use client'
import { Search } from '@mui/icons-material';
import { Autocomplete, Box, InputAdornment, TextField } from '@mui/material';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation'

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [listSearch, setListSearch] = useState<string[]>([]);
  const pathname = usePathname()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value = (e.target as HTMLInputElement).value;
      setSearchTerm(value);
  };


  const handleEnterKeyPress = (e: any) => {
    if (e.key === 'Enter') {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const hasSearchParam = urlSearchParams.has('search');

        if (hasSearchParam) {
          urlSearchParams.set('search', searchTerm);
        } else {
          urlSearchParams.append('search', searchTerm);
        }

        const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`

        router.push(newUrl);
    }
};





  return (
  <Autocomplete
    freeSolo
    id="searchBar"
    disableClearable
    options={listSearch}
    sx={{backgroundColor: "white"}}
    renderInput={(params) => (
      <TextField
        {...params}
        label="Search"
        onChange={(e) => handleInputChange(e)}
        InputProps={{
          ...params.InputProps,
          type: 'search',
          endAdornment: (
            <InputAdornment position="start">
              <Search/>
            </InputAdornment>
          ),
          onKeyDown: handleEnterKeyPress,
        }}
      />
    )}
  />
  );
}

export default SearchBar;

