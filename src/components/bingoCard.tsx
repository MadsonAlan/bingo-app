"use client"
import { useEffect, useState } from 'react';

export const BingoCard = () => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    // Gera 24 números únicos para a cartela
    const generateCard = () => {
      const uniqueNumbers: number[] = [];
      while (uniqueNumbers.length < 24) {
        const num = Math.floor(Math.random() * 75) + 1;
        if (!uniqueNumbers.includes(num)) {
          uniqueNumbers.push(num);
        }
      }
      setNumbers(uniqueNumbers);
    };
    generateCard();
  }, []);

  return (
    <div>
      <h2>Cartela de Bingo</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {numbers.map((num, index) => (
          <div key={index} style={{ border: '1px solid #000', padding: '10px', textAlign: 'center' }}>
            {num}
          </div>
        ))}
      </div>
    </div>
  );
};