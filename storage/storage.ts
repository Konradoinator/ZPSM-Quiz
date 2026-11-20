// storage/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const TERMS_ACCEPTED_KEY = 'quiz.termsAccepted';

export async function getJSON<T>(key: string): Promise<T | null> {
  const raw = await AsyncStorage.getItem(key);
  if (raw === null) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    // Uszkodzony lub nieaktualny wpis usuwamy i traktujemy jako brak danych.
    await AsyncStorage.removeItem(key);
    return null;
  }
}

export async function setJSON(key: string, value: unknown): Promise<void> {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function hasAcceptedTerms(): Promise<boolean> {
  const value = await getJSON<boolean>(TERMS_ACCEPTED_KEY);
  return value === true;
}

export async function acceptTerms(): Promise<void> {
  await setJSON(TERMS_ACCEPTED_KEY, true);
}
