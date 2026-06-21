import React, { useState, useEffect } from 'react';
import { Book, Search, Plus, Calendar, User, Clock, CheckCircle, AlertTriangle, Layers, Database, BarChart2 } from 'lucide-react';

interface BookItem {
  isbn: string;
  title: string;
  author: string;
  category: string;
  copiesTotal: number;
  copiesAvailable: number;
  shelfLocation: string;
}

interface LendingRecord {
  id: string;
  isbn: string;
  bookTitle: string;
  borrower: string;
  checkoutDate: string;
  dueDate: string;
  returned: boolean;
}

const INITIAL_BOOKS: BookItem[] = [
  {
    isbn: "978-0262510875",
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson, Gerald Jay Sussman",
    category: "Computer Science",
    copiesTotal: 4,
    copiesAvailable: 3,
    shelfLocation: "SEC-B / ROW-3 / SL-12"
  },
  {
    isbn: "978-0441569595",
    title: "Neuromancer",
    author: "William Gibson",
    category: "Fiction / Cyberpunk",
    copiesTotal: 6,
    copiesAvailable: 4,
    shelfLocation: "SEC-X / ROW-1 / SL-08"
  },
  {
    isbn: "978-0465026562",
    title: "Gödel, Escher, Bach: an Eternal Golden Braid",
    author: "Douglas R. Hofstadter",
    category: "Philosophy / Mathematics",
    copiesTotal: 3,
    copiesAvailable: 1,
    shelfLocation: "SEC-M / ROW-5 / SL-04"
  },
  {
    isbn: "978-0374134938",
    title: "Turing's Cathedral",
    author: "George Dyson",
    category: "History of Technology",
    copiesTotal: 5,
    copiesAvailable: 5,
    shelfLocation: "SEC-B / ROW-2 / SL-19"
  }
];

const INITIAL_RECORDS: LendingRecord[] = [
  {
    id: "TX-9021",
    isbn: "978-0262510875",
    bookTitle: "Structure and Interpretation of Computer Programs",
    borrower: "Jean-Baptiste Fourier",
    checkoutDate: "2026-06-10",
    dueDate: "2026-06-24",
    returned: false
  },
  {
    id: "TX-4052",
    isbn: "978-0441569595",
    bookTitle: "Neuromancer",
    author: "William Gibson",
    borrower: "Ada Lovelace",
    checkoutDate: "2026-06-12",
    dueDate: "2026-06-26",
    returned: false
  } as any,
  {
    id: "TX-1290",
    isbn: "978-0465026562",
    bookTitle: "Gödel, Escher, Bach: an Eternal Golden Braid",
    author: "Douglas R. Hofstadter",
    borrower: "Alan Turing",
    checkoutDate: "2026-06-05",
    dueDate: "2026-06-19",
    returned: false
  } as any,
  {
    id: "TX-1104",
    isbn: "978-0441569595",
    bookTitle: "Neuromancer",
    author: "William Gibson",
    borrower: "Claude Shannon",
    checkoutDate: "2026-06-01",
    dueDate: "2026-06-15",
    returned: true
  } as any
];

export default function ProjectLibrarySimulator() {
  const [books, setBooks] = useState<BookItem[]>(INITIAL_BOOKS);
  const [records, setRecords] = useState<LendingRecord[]>(INITIAL_RECORDS);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Forms & Interactive states
  const [newBook, setNewBook] = useState({
    isbn: "",
    title: "",
    author: "",
    category: "Computer Science",
    copiesTotal: 3,
    shelfLocation: "SEC-A / ROW-1 / SL-01"
  });
  
  const [checkoutData, setCheckoutData] = useState({
    isbn: "",
    borrower: ""
  });

  const [logs, setLogs] = useState<string[]>([
    "INITIALIZING DISTRIBUTED VOLUMES REGISTRY...",
    "SUCCESS // REGISTRY ONLINE. CACHE LATENCY: 0.12ms",
    "READY FOR BARCODE SCANNER INTERRUPTS."
  ]);

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 30)]);
  };

  const handleCreateBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBook.isbn || !newBook.title || !newBook.author) {
      addLog("ERROR: CATALOGING REJECTED // MISSING FIELD IDENTIFIERS");
      return;
    }

    if (books.some(b => b.isbn === newBook.isbn)) {
      addLog(`ERROR: DUPLICATE RECORD FOR ISBN ${newBook.isbn}`);
      return;
    }

    const bookToAdd: BookItem = {
      ...newBook,
      copiesAvailable: newBook.copiesTotal,
      copiesTotal: Number(newBook.copiesTotal)
    };

    setBooks(prev => [...prev, bookToAdd]);
    addLog(`CATALOG COMMIT // REGISTERED VOLUME: "${newBook.title.toUpperCase()}" (ISBN: ${newBook.isbn})`);
    
    // Reset form
    setNewBook({
      isbn: "",
      title: "",
      author: "",
      category: "Computer Science",
      copiesTotal: 3,
      shelfLocation: "SEC-A / ROW-1 / SL-01"
    });
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const targetBook = books.find(b => b.isbn === checkoutData.isbn);
    if (!targetBook) {
      addLog(`ERROR: REQUESTED ISBN ${checkoutData.isbn} NOT FOUND IN ASSET TREE`);
      return;
    }

    if (!checkoutData.borrower.trim()) {
      addLog("ERROR: BORROWER CLASSIFIER IDENTIFIER MUST NOT BE EMPTY");
      return;
    }

    if (targetBook.copiesAvailable <= 0) {
      addLog(`ERROR: VOLUME "${targetBook.title.toUpperCase()}" HAS ZERO AVAILABLE ON-SHELF COPIES`);
      return;
    }

    // Deduct available count
    setBooks(prev => prev.map(book => {
      if (book.isbn === targetBook.isbn) {
        return { ...book, copiesAvailable: book.copiesAvailable - 1 };
      }
      return book;
    }));

    const today = new Date().toISOString().split('T')[0];
    const duedate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const newRecord: LendingRecord = {
      id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
      isbn: targetBook.isbn,
      bookTitle: targetBook.title,
      borrower: checkoutData.borrower,
      checkoutDate: today,
      dueDate: duedate,
      returned: false
    };

    setRecords(prev => [newRecord, ...prev]);
    addLog(`FLOW COMMIT // ISSUED "${targetBook.title.toUpperCase()}" TO BORROWER "${checkoutData.borrower.toUpperCase()}" (DUE: ${duedate})`);
    
    setCheckoutData({ isbn: "", borrower: "" });
  };

  const handleReturn = (recordId: string) => {
    const record = records.find(r => r.id === recordId);
    if (!record || record.returned) return;

    // Increment available count
    setBooks(prev => prev.map(book => {
      if (book.isbn === record.isbn) {
        return { ...book, copiesAvailable: Math.min(book.copiesTotal, book.copiesAvailable + 1) };
      }
      return book;
    }));

    setRecords(prev => prev.map(r => {
      if (r.id === recordId) {
        return { ...r, returned: true };
      }
      return r;
    }));

    addLog(`FLOW COMMIT // VOLUME "${record.bookTitle.toUpperCase()}" RETURNED & RETRACTED SECURELY (ID: ${recordId})`);
  };

  const filteredBooks = books.filter(b => 
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.isbn.includes(searchQuery) ||
    b.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalCataloged = books.reduce((acc, b) => acc + b.copiesTotal, 0);
  const activeCheckouts = records.filter(r => !r.returned).length;
  const overdueCount = records.filter(r => {
    if (r.returned) return false;
    const dueDate = new Date(r.dueDate);
    const today = new Date();
    return dueDate < today;
  }).length;

  return (
    <div className="bg-neutral-950 border border-neutral-900 overflow-hidden text-neutral-200 text-sm select-none" id="library-simulator-main-frame">
      {/* Header bar */}
      <div className="border-b border-neutral-900 bg-neutral-950 px-4 py-3 flex justify-between items-center" id="library-sim-header">
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-neutral-400" />
          <span className="font-mono text-xs uppercase text-neutral-300 tracking-wider">SECURE DISTRIBUTED VAULT CATALOGUE</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>SYSTEM HIGH</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12" id="library-grid-columns">
        {/* Left Column Controls & Visual Metrics */}
        <div className="p-4 md:p-6 border-b xl:border-b-0 xl:border-r border-neutral-900 xl:col-span-5 space-y-6 flex flex-col justify-between" id="library-sidebar-container">
          <div className="space-y-6">
            
            {/* Real Stats Display */}
            <div className="grid grid-cols-3 gap-3" id="library-stats">
              <div className="border border-neutral-900 bg-neutral-950/40 p-3 rounded-xl flex flex-col justify-between min-h-[90px]">
                <div className="flex justify-between items-center text-neutral-500">
                  <Database className="w-3.5 h-3.5" />
                  <span className="font-mono text-[8px] uppercase tracking-wider">SHELF LOAD</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-bold font-serif text-white">{totalCataloged}</div>
                  <div className="font-mono text-[8.5px] text-neutral-500 uppercase">VOLUMES COPIES</div>
                </div>
              </div>

              <div className="border border-neutral-900 bg-neutral-950/40 p-3 rounded-xl flex flex-col justify-between min-h-[90px]">
                <div className="flex justify-between items-center text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span className="font-mono text-[8px] uppercase tracking-wider">ACTIVE</span>
                </div>
                <div className="space-y-0.5">
                  <div className="text-xl font-bold font-serif text-white">{activeCheckouts}</div>
                  <div className="font-mono text-[8.5px] text-neutral-500 uppercase">CHECKOUTS</div>
                </div>
              </div>

              <div className="border border-neutral-900 bg-neutral-950/40 p-3 rounded-xl flex flex-col justify-between min-h-[90px]">
                <div className="flex justify-between items-center text-rose-500">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span className="font-mono text-[8px] uppercase tracking-wider text-neutral-500">OVERDUE</span>
                </div>
                <div className="space-y-0.5">
                  <div className={`text-xl font-bold font-serif ${overdueCount > 0 ? 'text-rose-500 animate-pulse' : 'text-neutral-400'}`}>{overdueCount}</div>
                  <div className="font-mono text-[8.5px] text-neutral-500 uppercase">WARNING FLAGS</div>
                </div>
              </div>
            </div>

            {/* Interactive Issue/Checkout Book form */}
            <div className="space-y-2 border border-neutral-900/80 p-4 bg-neutral-900/30 rounded-xl">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-neutral-400" /> ISSUE / CHECKOUT RECORD
              </div>
              <form onSubmit={handleCheckout} className="space-y-3 pt-2">
                <div className="space-y-1.5">
                  <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">SELECT ASSET BY ISBN</label>
                  <select
                    className="w-full bg-black/60 border border-white/5 rounded-lg py-2 px-3 text-xs text-white outline-none focus:border-white/20"
                    value={checkoutData.isbn}
                    onChange={e => setCheckoutData({ ...checkoutData, isbn: e.target.value })}
                    required
                  >
                    <option value="" className="bg-neutral-950 text-neutral-500">-- Choose Cataloged Book --</option>
                    {books.map(b => (
                      <option key={b.isbn} value={b.isbn} disabled={b.copiesAvailable <= 0} className="bg-neutral-950">
                        {b.title} ({b.copiesAvailable}/{b.copiesTotal} left)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">BORROWER CREDENTIAL IDENTIFIER</label>
                  <div className="relative">
                    <User className="absolute left-2.5 top-2.5 w-3.5 h-3.5 text-neutral-600" />
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/5 focus:border-white/20 rounded-lg py-2 pl-8 pr-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                      placeholder="e.g. Marie Curie"
                      value={checkoutData.borrower}
                      onChange={e => setCheckoutData({ ...checkoutData, borrower: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black hover:bg-neutral-200 transition-colors py-2 rounded-lg font-mono text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                >
                  <Clock className="w-3 h-3" /> COMMIT TEMPORARY TRANSFER
                </button>
              </form>
            </div>

            {/* Catalog new asset form */}
            <div className="space-y-2 border border-neutral-900/80 p-4 bg-neutral-900/30 rounded-xl">
              <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest font-bold flex items-center gap-1.5">
                <Plus className="w-3.5 h-3.5 text-neutral-400" /> REGISTER & CATALOG NEW VOLUME
              </div>
              <form onSubmit={handleCreateBook} className="space-y-3 pt-2">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">UNIQUE ISBN-13</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/5 focus:border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                      placeholder="e.g. 978-0131103627"
                      value={newBook.isbn}
                      onChange={e => setNewBook({ ...newBook, isbn: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">SHELF ADDRESS</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/5 focus:border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                      placeholder="e.g. SEC-A / ROW-4 / SL-02"
                      value={newBook.shelfLocation}
                      onChange={e => setNewBook({ ...newBook, shelfLocation: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">BOOK TITLE / METADATA HEADER</label>
                  <input
                    type="text"
                    className="w-full bg-black/60 border border-white/5 focus:border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                    placeholder="e.g. The C Programming Language"
                    value={newBook.title}
                    onChange={e => setNewBook({ ...newBook, title: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">AUTHOR / OWNER</label>
                    <input
                      type="text"
                      className="w-full bg-black/60 border border-white/5 focus:border-white/20 rounded-lg py-2 px-3 text-xs text-white placeholder-neutral-700 outline-none transition-colors"
                      placeholder="e.g. Dennis Ritchie"
                      value={newBook.author}
                      onChange={e => setNewBook({ ...newBook, author: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-mono text-[8.5px] uppercase tracking-wider text-neutral-500">COPIES INDEX</label>
                    <input
                      type="number"
                      min="1"
                      max="20"
                      className="w-full bg-black/60 border border-white/5 focus:border-white/20 rounded-lg py-2 px-3 text-xs text-white outline-none"
                      value={newBook.copiesTotal}
                      onChange={e => setNewBook({ ...newBook, copiesTotal: Number(e.target.value) })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-neutral-900 hover:bg-neutral-850 text-neutral-300 border border-white/10 transition-colors py-2 rounded-lg font-mono text-[9px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-3 h-3" /> RECORD TO MEMORY POOL
                </button>
              </form>
            </div>
            
          </div>

          {/* Micro Terminal telemetry line */}
          <div className="space-y-2 pt-4 border-t border-neutral-900/80">
            <div className="flex items-center gap-1 font-mono text-[10px] text-neutral-400">
              <Layers className="w-3 h-3 text-neutral-400" /> SYSTEMS TELEMETRY CONSOLE
            </div>
            <div className="bg-black/60 border border-white/5 text-[9px] font-mono p-3 rounded-lg h-28 overflow-y-auto space-y-1 text-neutral-400" id="library-console-terminal">
              {logs.map((log, idx) => (
                <div key={idx} className="flex gap-2 leading-relaxed">
                  <span className="text-neutral-600 select-none">❯</span>
                  <span className={log.includes("ERROR") ? "text-rose-400" : log.includes("COMMIT") ? "text-emerald-400 font-medium" : "text-neutral-400"}>{log}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column Catalog List view and Active Transaction Cards */}
        <div className="p-4 md:p-6 xl:col-span-7 space-y-6 bg-black/30 flex flex-col justify-between" id="library-main-panel">
          <div className="space-y-6">
            
            {/* Live Search and table */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="font-display font-medium text-white text-md tracking-tight uppercase">VOLUMES LIST</h3>
                  <p className="text-[10px] font-mono text-neutral-500">SEARCH AND QUERY ARCHIVE INDEX COPIES</p>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-neutral-600" />
                  <input
                    type="text"
                    className="w-full bg-neutral-900 border border-white/5 focus:border-white/20 rounded-full py-1.5 pl-8 pr-4 text-xs text-white placeholder-neutral-600 outline-none transition-all"
                    placeholder="Search title, author, category..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Book catalogue grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="library-books-grid">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book) => {
                    const shelfFillPercent = (book.copiesAvailable / book.copiesTotal) * 100;
                    return (
                      <div 
                        key={book.isbn} 
                        className="bg-neutral-900/60 border border-white/5 rounded-xl p-4 flex flex-col justify-between space-y-4 hover:border-white/10 transition-colors"
                      >
                        <div className="space-y-2">
                          <div className="flex justify-between items-start gap-2">
                            <span className="px-2 py-0.5 bg-neutral-950 border border-white/5 text-[8.5px] font-mono text-neutral-500 rounded-md">
                              {book.category}
                            </span>
                            <span className="font-mono text-[9px] text-neutral-600 font-bold">
                              {book.shelfLocation}
                            </span>
                          </div>
                          <div>
                            <h4 className="font-display font-bold text-white text-sm line-clamp-1 uppercase tracking-tight">{book.title}</h4>
                            <p className="text-neutral-500 text-xs mt-0.5 font-light">by {book.author}</p>
                          </div>
                        </div>

                        <div className="space-y-1.5 pt-2 border-t border-neutral-950">
                          <div className="flex justify-between items-center text-[9px] font-mono">
                            <span className="text-neutral-500 uppercase">AVAILABLE COPIES</span>
                            <span className={book.copiesAvailable === 0 ? "text-rose-500 font-bold" : "text-white font-bold"}>
                              {book.copiesAvailable} / {book.copiesTotal}
                            </span>
                          </div>
                          {/* visual fraction indicator bar */}
                          <div className="w-full bg-neutral-950 h-1.5 rounded-full overflow-hidden border border-white/5">
                            <div 
                              className={`h-full transition-all duration-500 ${
                                book.copiesAvailable === 0 ? 'bg-rose-500' :
                                shelfFillPercent < 40 ? 'bg-amber-500' : 'bg-white'
                              }`} 
                              style={{ width: `${shelfFillPercent}%` }}
                            />
                          </div>
                          <div className="text-[8px] font-mono text-neutral-600">ISBN-13: {book.isbn}</div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="col-span-2 text-center py-10 border border-dashed border-neutral-900 rounded-xl font-mono text-xs text-neutral-600">
                    NO REGISTERED ASSETS MATCH SEARCH CRITERIA
                  </div>
                )}
              </div>
            </div>

            {/* Active transactions table */}
            <div className="space-y-3 pt-4 border-t border-neutral-900">
              <div>
                <h3 className="font-display font-medium text-white text-md tracking-tight uppercase">ACTIVE LENDING OUTBOX</h3>
                <p className="text-[10px] font-mono text-neutral-500">LOGICAL POSSESSION TRACE RECORDS</p>
              </div>

              <div className="overflow-x-auto w-full border border-neutral-900 rounded-xl bg-neutral-950/40">
                <table className="w-full border-collapse text-left text-xs font-sans">
                  <thead>
                    <tr className="border-b border-neutral-900 bg-black/60 font-mono text-[8.5px] uppercase text-neutral-500 tracking-wider">
                      <th className="py-3 px-4 font-semibold">REF TRANSACTION ID</th>
                      <th className="py-3 px-4 font-semibold">VOLUME TITLE</th>
                      <th className="py-3 px-4 font-semibold">BORROWER</th>
                      <th className="py-3 px-4 font-semibold">DUE DATE</th>
                      <th className="py-3 px-4 font-semibold text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((r) => {
                      const isOverdue = !r.returned && new Date(r.dueDate) < new Date();
                      return (
                        <tr key={r.id} className="border-b border-neutral-900 last:border-0 hover:bg-neutral-900/20 transition-colors">
                          <td className="py-3.5 px-4 font-mono text-[10px] font-bold text-neutral-400">
                            {r.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-white truncate max-w-[200px] uppercase text-[11px] tracking-tight">{r.bookTitle}</div>
                            <div className="text-[9px] font-mono text-neutral-600 mt-0.5">{r.isbn}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-neutral-300">
                            {r.borrower}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-neutral-500" />
                              <span className={`font-mono text-[10px] ${r.returned ? 'text-neutral-500' : isOverdue ? 'text-rose-400 font-bold' : 'text-neutral-300'}`}>
                                {r.dueDate}
                              </span>
                              {isOverdue && !r.returned && (
                                <span className="bg-rose-950 text-rose-500 font-mono text-[7.5px] font-bold px-1 py-0.2 rounded uppercase animate-pulse border border-rose-900">OVERDUE</span>
                              )}
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {r.returned ? (
                              <span className="font-mono text-[8px] tracking-widest text-[#a3a3a3] bg-neutral-900/60 py-1 px-2.5 rounded-full uppercase border border-neutral-800">
                                RETURNED
                              </span>
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleReturn(r.id)}
                                className="font-mono text-[8px] tracking-widest text-black bg-white hover:bg-neutral-200 py-1 px-3.5 font-bold rounded-full uppercase transition-all"
                              >
                                RETURN
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
