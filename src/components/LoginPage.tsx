import React, { useState } from 'react';
import { 
  Lock, 
  User, 
  ShieldCheck, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Building2, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  Languages,
  UserCheck
} from 'lucide-react';
import { Language } from '../utils/i18n';
import { AuthUser } from '../types/auth';
import { Employee } from '../types/employee';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  employees: Employee[];
  lang: Language;
  onToggleLang: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLoginSuccess,
  employees,
  lang,
  onToggleLang
}) => {
  const [loginMode, setLoginMode] = useState<'admin' | 'staff'>('staff');
  
  // Admin credentials
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  
  // Staff credentials
  const [staffIdentifier, setStaffIdentifier] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const normalize = (text: string) => 
    (text || '').toLowerCase().replace(/\s+/g, ' ').trim();

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const cleanUser = normalize(adminUsername);
      const cleanPass = adminPassword.trim();

      if (!cleanUser || !cleanPass) {
        setError(lang === 'am' ? 'እባክዎ የአስተዳዳሪ የተጠቃሚ ስም እና የይለፍ ቃል ያስገቡ!' : 'Please enter admin username and password!');
        setIsLoading(false);
        return;
      }

      if ((cleanUser === 'admin' || cleanUser === 'administrator') && cleanPass === 'admin123') {
        const adminUser: AuthUser = {
          id: 'user-admin-01',
          username: cleanUser,
          nameAm: 'አስተዳዳሪ (የሲስተም እና የሰው ኃይል ኃላፊ)',
          nameEn: 'System Administrator (IT & HR Admin)',
          role: 'admin',
          department: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
          positionAm: 'ዋና የሲስተም አስተዳዳሪ',
          positionEn: 'Lead System Administrator',
          email: 'admin.appraisal@ics.gov.et',
          loggedInAt: new Date().toISOString()
        };

        if (rememberMe) {
          localStorage.setItem('auth_user_session', JSON.stringify(adminUser));
        } else {
          sessionStorage.setItem('auth_user_session', JSON.stringify(adminUser));
        }

        setIsLoading(false);
        onLoginSuccess(adminUser);
      } else {
        setError(lang === 'am' ? 'የተሳሳተ የአስተዳዳሪ ስም ወይም የይለፍ ቃል!' : 'Invalid admin username or password!');
        setIsLoading(false);
      }
    }, 350);
  };

  const handleStaffSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const query = normalize(staffIdentifier);
      const pass = staffPassword.trim();

      if (!query || !pass) {
        setError(lang === 'am' ? 'እባክዎ የስራ ባልደረባውን ስም/መለያ እና የይለፍ ቃል ያስገቡ!' : 'Please enter your name/ID and password!');
        setIsLoading(false);
        return;
      }

      // Find staff in employees list
      const matchedEmployee = employees.find((emp) => {
        const idMatch = normalize(emp.employeeId) === query;
        const nameAmMatch = normalize(emp.fullNameAm).includes(query) || query.includes(normalize(emp.fullNameAm));
        const nameEnMatch = normalize(emp.fullNameEn).includes(query) || query.includes(normalize(emp.fullNameEn));
        const emailMatch = normalize(emp.email) === query || normalize(emp.email.split('@')[0]) === query;
        const dbIdMatch = normalize(emp.id) === query;
        return idMatch || nameAmMatch || nameEnMatch || emailMatch || dbIdMatch;
      });

      if (!matchedEmployee) {
        setError(
          lang === 'am' 
            ? `በስም ወይም በመለያ ቁጥር "${staffIdentifier}" የተመዘገበ ሰራተኛ አልተገኘም! እባክዎ ትክክለኛ ስምዎን ወይም መለያ ቁጥርዎን ያስገቡ።`
            : `No staff found with identifier "${staffIdentifier}". Please verify your name or employee ID.`
        );
        setIsLoading(false);
        return;
      }

      // Check password
      const storedCustomPass = localStorage.getItem(`staff_pwd_${matchedEmployee.id}`);
      const validPass = 
        (storedCustomPass && pass === storedCustomPass) ||
        pass === 'staff123' ||
        pass === matchedEmployee.employeeId ||
        pass === matchedEmployee.employeeId.toLowerCase() ||
        pass === '123456';

      if (!validPass) {
        setError(
          lang === 'am'
            ? 'የተሳሳተ የይለፍ ቃል! (የይለፍ ቃልዎን ወይም የመለያ ቁጥርዎን ይጠቀሙ)'
            : 'Incorrect password! Please use your assigned password or Employee ID.'
        );
        setIsLoading(false);
        return;
      }

      // Successful staff authentication
      const staffUser: AuthUser = {
        id: matchedEmployee.id,
        employeeId: matchedEmployee.employeeId,
        username: matchedEmployee.employeeId.toLowerCase(),
        nameAm: matchedEmployee.fullNameAm,
        nameEn: matchedEmployee.fullNameEn,
        role: 'employee',
        department: matchedEmployee.teamAm || matchedEmployee.directorateAm,
        positionAm: matchedEmployee.positionAm,
        positionEn: matchedEmployee.positionEn,
        jobLevel: matchedEmployee.jobLevel,
        linkedJobId: matchedEmployee.linkedJobId,
        email: matchedEmployee.email,
        loggedInAt: new Date().toISOString()
      };

      if (rememberMe) {
        localStorage.setItem('auth_user_session', JSON.stringify(staffUser));
      } else {
        sessionStorage.setItem('auth_user_session', JSON.stringify(staffUser));
      }

      setIsLoading(false);
      onLoginSuccess(staffUser);
    }, 350);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 flex flex-col justify-between p-4 sm:p-6 text-slate-100 relative overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar with Language Toggle */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-inner">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white">
              {lang === 'am' ? 'የኢሚግሬሽንና ዜግነት አገልግሎት' : 'Immigration & Citizenship Service'}
            </h1>
            <p className="text-[11px] text-slate-400">
              {lang === 'am' ? 'የኢንፎርሜሽን ቴክኖሎጂ መምሪያ' : 'Information Technology Directorate'}
            </p>
          </div>
        </div>

        <button
          onClick={onToggleLang}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-xs font-semibold text-slate-200 transition shadow-xs cursor-pointer backdrop-blur-xs"
        >
          <Languages className="w-3.5 h-3.5 text-blue-400" />
          <span>{lang === 'am' ? 'English' : 'አማርኛ'}</span>
        </button>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md mx-auto my-auto py-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 text-slate-900 p-6 sm:p-8">
          
          {/* Institution Header Badge */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30 mb-3">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
              {lang === 'am' ? 'የስርዓቱ መግቢያ ገጽ' : 'System Login Portal'}
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              {lang === 'am' 
                ? 'የስራ አፈጻጸም ምዘናና የሲቪል ሰርቪስ አስተዳደር' 
                : 'Performance Appraisal & Civil Service Management'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Staff vs Admin) */}
          <div className="grid grid-cols-2 gap-1 bg-slate-100 p-1.5 rounded-2xl mb-5 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => {
                setLoginMode('staff');
                setError(null);
              }}
              className={`py-2.5 px-2 rounded-xl transition text-center cursor-pointer flex items-center justify-center gap-2 ${
                loginMode === 'staff' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'hover:bg-slate-200/70 text-slate-700'
              }`}
            >
              <UserCheck className="w-4 h-4 shrink-0" />
              <span>{lang === 'am' ? 'የሰራተኛ መግቢያ (Staff)' : 'Staff Login'}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setLoginMode('admin');
                setError(null);
              }}
              className={`py-2.5 px-2 rounded-xl transition text-center cursor-pointer flex items-center justify-center gap-2 ${
                loginMode === 'admin' 
                  ? 'bg-blue-600 text-white shadow-sm' 
                  : 'hover:bg-slate-200/70 text-slate-700'
              }`}
            >
              <KeyRound className="w-4 h-4 shrink-0" />
              <span>{lang === 'am' ? 'አስተዳዳሪ (Admin)' : 'Admin Login'}</span>
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-xs flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span className="leading-snug">{error}</span>
            </div>
          )}

          {/* STAFF LOGIN FORM */}
          {loginMode === 'staff' && (
            <form onSubmit={handleStaffSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am' ? 'የሰራተኛው ስም ወይም መለያ ቁጥር (Name / ID)' : 'Staff Name or Employee ID'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={staffIdentifier}
                    onChange={(e) => setStaffIdentifier(e.target.value)}
                    placeholder={lang === 'am' ? 'ምሳሌ፡ ሊዲያ ግሩም ወይም ICS-NET-0842' : 'e.g. Lydia Girum or ICS-NET-0842'}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50 font-medium text-slate-900"
                  />
                </div>

                {/* Quick Staff Selector Dropdown */}
                {employees.length > 0 && (
                  <div className="mt-1.5">
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value) {
                          setStaffIdentifier(e.target.value);
                          setError(null);
                        }
                      }}
                      className="w-full text-[11px] py-1.5 px-2 bg-slate-50 hover:bg-slate-100 text-slate-600 border border-slate-200 rounded-lg cursor-pointer focus:outline-none"
                    >
                      <option value="">{lang === 'am' ? '-- ወይም ስምዎን ከዝርዝር ይምረጡ --' : '-- Or choose your name from list --'}</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.fullNameAm}>
                          {emp.fullNameAm} ({emp.employeeId}) — {emp.positionAm}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am' ? 'የይለፍ ቃል (Password)' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={staffPassword}
                    onChange={(e) => setStaffPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50 font-medium text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                  <span>{lang === 'am' ? 'አስታውሰኝ (Remember Me)' : 'Remember Me'}</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {lang === 'am' ? 'እንደ ሰራተኛ ወደ ሲስተም ግባ' : 'Sign In as Staff'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* ADMIN LOGIN FORM */}
          {loginMode === 'admin' && (
            <form onSubmit={handleAdminSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am' ? 'የአስተዳዳሪ የተጠቃሚ ስም (Admin Username)' : 'Admin Username'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50 font-medium text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'am' ? 'የይለፍ ቃል (Password)' : 'Password'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs pl-9 pr-10 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:outline-none bg-slate-50/50 font-medium text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300 cursor-pointer"
                  />
                  <span>{lang === 'am' ? 'አስታውሰኝ (Remember Me)' : 'Remember Me'}</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 hover:shadow-lg transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>
                      {lang === 'am' ? 'እንደ አስተዳዳሪ ወደ ሲስተም ግባ' : 'Sign In as Administrator'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

        </div>
      </div>

      {/* Footer System Info */}
      <div className="w-full max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 pt-4 border-t border-slate-800/60 z-10 gap-2">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {lang === 'am' 
              ? 'የኢትዮጵያ ሲቪል ሰርቪስ የውጤት ተኮር ምዘና መመሪያ ደረጃዎችን ያሟላ' 
              : 'Compliant with Civil Service Result-Oriented Appraisal Standards'}
          </span>
        </div>
        <div className="text-slate-500 font-mono">
          v2.4.0 • Secure Authentication Portal
        </div>
      </div>
    </div>
  );
};
