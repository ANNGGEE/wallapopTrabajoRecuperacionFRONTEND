import { useEffect, useState } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";
import AnuncioList from "../components/AnuncioList";

export default function Anuncio() {
  return (
    <main className="container">
      <h1>Wallapop React</h1>
      <AnuncioList />
    </main>
  );
}