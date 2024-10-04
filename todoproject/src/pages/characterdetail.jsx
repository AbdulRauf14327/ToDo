import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Spinner from "./spinner";
import axios from "axios";
const API_URL = "https://rickandmortyapi.com/";

const CharacterDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [character, setCharacter] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}api/character/${id}`);
        setCharacter(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <div className="   max-md:top-64 md:w-[calc(100vw-18rem)] w-full md:ml-[16rem] absolute top-8  py-10 pl-10">
        {loading ? (
          <Spinner loading={loading} />
        ) : (
          <div className=" border-2 p-2">
            <img src={character?.image} className="w-full h-72" />
            <div className=" mt-3">
              <div className="font-bold flex flex-wrap ">{`Name: ${character?.name}`}</div>
              <div className="text-base  font-semibold">
                {`Species:  ${character?.species}`}
              </div>
              <div className="text-base font-semibold">{`Status: ${character?.status}`}</div>
              <div className="text-base font-semibold">{`Gender: ${character?.gender}`}</div>
              <div className="text-base font-semibold">{`Location: ${character?.location.name}`}</div>
              <div className="text-base font-semibold">{`Origin: ${character?.origin.name}`}</div>
              <div className="text-base font-semibold">{`Created: ${character?.created}`}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CharacterDetail;
