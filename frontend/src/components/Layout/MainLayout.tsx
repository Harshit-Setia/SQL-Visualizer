import React from "react";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="min-h-screen bg-background text-on-surface-variant font-sans p-6 flex flex-col gap-6">
      {/* Top Header - SQL_FORGE */}
      <header className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-md">
            <span className="text-primary font-display font-bold text-xl">
              SQL_FORGE
            </span>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-surface-high border border-surface-bright flex items-center justify-center">
          <div className="w-6 h-6 bg-on-surface-variant/20 rounded-full" />
        </div>
      </header>

      <main className="flex-1 flex flex-col gap-6 max-w-7xl mx-auto w-full">
        {children}
      </main>

      {/* Bottom Navigation HUD */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-surface-container/80 backdrop-blur-md px-8 py-4 rounded-2xl flex gap-12 items-center">
        {/* Icons here */}
      </nav>
    </div>
  );
};
