import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [active, setActive] = useState("instrucctions");
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    const detailData = await data.json();
    console.log(detailData);
    setDetails(detailData);
  };
  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <DetailWrapper>
      <div>
        <h2>{details.title}</h2>
        <img src={details.image} alt={details.title} />
      </div>
      <Info>
        <Button
          className={active === "instructions" ? "active" : ""}
          onClick={() => setActive("instructions")}
        >
          Instructions
        </Button>
        <Button
          className={active === "ingredients" ? "active" : ""}
          onClick={() => setActive("ingredients")}
        >
          Ingredients
        </Button>
        {active === "instructions" && (
          <div>
            <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
            <h3 dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
          </div>
        )}
        {active === "ingredients" && (
          <ul>
            {details.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id}>{ingredient.original}</li>
            ))}
          </ul>
        )}
      </Info>
    </DetailWrapper>
  );
}
const DetailWrapper = styled.div`
  margin-top: 5rem;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 3rem;
  }
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
    flex-direction: column;
    img {
      width: 100%;
    }
  }
`;
const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    padding: 0.8rem;
    margin-top: 2rem;
    margin-bottom: 0rem;
  }
`;

const Info = styled.div`
  margin-left: 2rem;
  justify-content: center;
`;
export default Recipe;
