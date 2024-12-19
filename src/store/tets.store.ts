import { ResultType } from '@/types/test'
import { create } from 'zustand'

interface Type {
	data: ResultType | null
	setData: (data: ResultType) => void
}

const useTestStore = create<Type>(set => ({
	data: null,
	setData: data => set({ data }),
}))

export default useTestStore
