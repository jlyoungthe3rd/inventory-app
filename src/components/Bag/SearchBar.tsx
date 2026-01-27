interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export const Searchbar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className='search bar'>
      <input
        type='text'
        placeholder='Search items...'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></input>{' '}
    </div>
  );
};
