import type { ChangeEvent } from 'react';
import { useState } from 'react';
import { apiClient } from 'src/utils/apiClient';

export const useHome = () => {
  const [inputValue, setInputValue] = useState('');
  const [colors, setColors] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState<number>(4);
  const [loading, setLoading] = useState(false);

  const loadingText = '作成中...';
  const [chars, setChars] = useState<string[]>([]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const valueAsNumber = Number(event.target.value);
    setSelectedValue(valueAsNumber);
    console.log('選択された値:', event.target.value);
  };

  const handleSubmit = async () => {
    setColors([]);
    setLoading(true);
    console.log(inputValue);
    const res = await apiClient.color.$post({ body: { text: inputValue, number: selectedValue } });
    console.log(res);
    if (res !== null && res !== undefined) {
      const colorsArray = Object.values(res);
      setColors(colorsArray);
      setLoading(false);
    } else {
      console.error('API response is undefined.');
      setLoading(false);
    }
  };
  return {
    inputValue,
    setInputValue,
    colors,
    setColors,
    selectedValue,
    setSelectedValue,
    loadingText,
    loading,
    chars,
    setChars,
    handleInputChange,
    handleChange,
    handleSubmit,
  };
};
