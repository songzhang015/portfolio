"use client";

import { createContext, useContext } from "react";

/* Default false: pages without the loadup overlay (project pages) are never
   in a loading state, so anything reading this renders straight away */
export const LoadingContext = createContext(false);
export const useLoading = () => useContext(LoadingContext);
