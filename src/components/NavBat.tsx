interface Props {
  setCategory: (category: string) => void;
  category: string;
  country: string;
  setCountry: (country: string) => void;
  key: string;
  setKey: (key: string) => void;
}

const NavBat = ({ category, country, setCategory, setCountry, setKey }: Props) => {
  //
  return (
    <div className="navbar">
      {/* to chhose the category of the news */}
      <button onClick={() => setCategory("general")}>General</button>
      <button onClick={() => setCategory("business")}>Business</button>
      <button onClick={() => setCategory("entertainment")}>
        Entertainment
      </button>
      <button onClick={() => setCategory("health")}>Health</button>
      <button onClick={() => setCategory("science")}>Science</button>
      <button onClick={() => setCategory("sports")}>Sports</button>

      {/* to chhose the country of the news from the select */}
      <select
        onChange={(e) => setCountry(e.target.value)}
        name="country"
        id="country"
      >
        <option value="il">Israel</option>
        <option value="us">United States</option>
        <option value="gb">United Kingdom</option>
      </select>
    </div>
  );
};

export default NavBat;
