import { useEffect, useState } from 'react';

import * as S from "./styles";
import Columns from "./components/Columns";
import { SearchBar } from "./components/Searchbar";

import LoadOverlay from "~/components/LoadOverlay";
import { fetchRegistrations } from '~/services/registrations';
import { Registration } from '~/types/types';
import { debounce } from '~/utils/debounce';
import { MIN_LOADING_TIME } from '~/utils/constants';

const DashboardPage = () => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');

  const loadData = async (query: string = '') => {
    setLoading(true);
    setError(null);

    if (!query)
      setSearchValue('');

    const fetchPromise = fetchRegistrations(query);
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, MIN_LOADING_TIME));

    try {
      const [ result ] = await Promise.all([fetchPromise, timeoutPromise]);
      setRegistrations(result);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const debouncedLoadData = debounce((query: string) => {
      loadData(query);
    }, 500);

    const query = searchValue ? `?cpf=${searchValue}` : '';
    debouncedLoadData(query);

    return () => debouncedLoadData.cancel();
  }, [searchValue]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
  };

  return (
    <S.Container>
      { loading && <LoadOverlay label={"Carregando"} /> }
      { error && <div>Error: {error}</div> }
      
      <SearchBar onSearch={handleSearch} refetchData={loadData} />
      <Columns registrations={registrations} refetchData={loadData} />
    </S.Container>
  );
};
export default DashboardPage;
