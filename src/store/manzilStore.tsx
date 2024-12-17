import {create} from 'zustand';

type Tuman = {
  viloyat: string;
  nom: string;
};

type ManzilStore = {
  viloyatlar: string[];
  tumanlar: Tuman[];
  addViloyat: (viloyat: string) => void;
  addTuman: (tuman: Tuman) => void;
  deleteViloyat: (viloyat: string) => void;
  deleteTuman: (tuman: Tuman) => void;
  updateViloyat: (oldViloyat: string, newViloyat: string) => void;
  updateTuman: (oldTuman: Tuman, newTuman: Tuman) => void;
};

export const useManzilStore = create<ManzilStore>((set) => ({
  viloyatlar: [],
  tumanlar: [],
  addViloyat: (viloyat) => set((state) => ({
    viloyatlar: [...state.viloyatlar, viloyat],
  })),
  addTuman: (tuman) => set((state) => ({
    tumanlar: [...state.tumanlar, tuman],
  })),
  deleteViloyat: (viloyat) => set((state) => ({
    viloyatlar: state.viloyatlar.filter((v) => v !== viloyat),
  })),
  deleteTuman: (tuman) => set((state) => ({
    tumanlar: state.tumanlar.filter((t) => t.nom !== tuman.nom || t.viloyat !== tuman.viloyat),
  })),
  updateViloyat: (oldViloyat, newViloyat) => set((state) => ({
    viloyatlar: state.viloyatlar.map((v) => v === oldViloyat ? newViloyat : v),
  })),
  updateTuman: (oldTuman, newTuman) => set((state) => ({
    tumanlar: state.tumanlar.map((t) => t.nom === oldTuman.nom && t.viloyat === oldTuman.viloyat ? newTuman : t),
  })),
}));
