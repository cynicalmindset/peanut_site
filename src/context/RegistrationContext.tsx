import React, { createContext, useContext, useState, useEffect } from 'react';
import { EventItem, RegistrationRecord } from '../types/event';

interface RegistrationContextType {
  registrations: RegistrationRecord[];
  isRegistered: (eventId: string) => boolean;
  getRegistrationForEvent: (eventId: string) => RegistrationRecord | undefined;
  addRegistration: (record: Omit<RegistrationRecord, 'id' | 'registeredAt' | 'referenceCode'>) => Promise<RegistrationRecord>;
  cancelRegistration: (id: string) => void;
  activeModalEvent: EventItem | null;
  openRegistrationModal: (event: EventItem) => void;
  closeRegistrationModal: () => void;
  isPassesDrawerOpen: boolean;
  openPassesDrawer: () => void;
  closePassesDrawer: () => void;
}

const STORAGE_KEY = 'atmosphere_registrations_v1';

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error loading registrations from localStorage:', e);
      return [];
    }
  });

  const [activeModalEvent, setActiveModalEvent] = useState<EventItem | null>(null);
  const [isPassesDrawerOpen, setIsPassesDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(registrations));
    } catch (e) {
      console.error('Error saving registrations to localStorage:', e);
    }
  }, [registrations]);

  const isRegistered = (eventId: string) => {
    return registrations.some(r => r.eventId === eventId);
  };

  const getRegistrationForEvent = (eventId: string) => {
    return registrations.find(r => r.eventId === eventId);
  };

  const addRegistration = async (
    data: Omit<RegistrationRecord, 'id' | 'registeredAt' | 'referenceCode'>
  ): Promise<RegistrationRecord> => {
    // Generate a unique human-friendly ticket reference code, e.g. ATM-8492-BOM
    const cityCode = data.eventCity.slice(0, 3).toUpperCase();
    const randomHex = Math.floor(1000 + Math.random() * 9000);
    const referenceCode = `ATM-${randomHex}-${cityCode}`;

    const newRecord: RegistrationRecord = {
      ...data,
      id: `reg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      registeredAt: new Date().toISOString(),
      referenceCode,
    };

    setRegistrations(prev => [newRecord, ...prev]);
    return newRecord;
  };

  const cancelRegistration = (id: string) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  const openRegistrationModal = (event: EventItem) => {
    setActiveModalEvent(event);
  };

  const closeRegistrationModal = () => {
    setActiveModalEvent(null);
  };

  const openPassesDrawer = () => setIsPassesDrawerOpen(true);
  const closePassesDrawer = () => setIsPassesDrawerOpen(false);

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        isRegistered,
        getRegistrationForEvent,
        addRegistration,
        cancelRegistration,
        activeModalEvent,
        openRegistrationModal,
        closeRegistrationModal,
        isPassesDrawerOpen,
        openPassesDrawer,
        closePassesDrawer,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = () => {
  const context = useContext(RegistrationContext);
  if (!context) throw new Error('useRegistration must be used within a RegistrationProvider');
  return context;
};

