import React, { useState, useMemo } from 'react';
import { Employee, EmploymentStatus, EmploymentType, Gender } from '../types/employee';
import { AppraisalRecord } from '../types/appraisal';
import { MonthlyReport } from '../types/monthlyReport';
import { JobDescription } from '../types/jobDescription';
import { Language } from '../utils/i18n';
import { OFFICIAL_STAFF_POSITIONS } from '../data/officialStaffPositions';
import { AuthUser } from '../types/auth';
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  UserCheck, 
  Building2, 
  Briefcase, 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  GraduationCap, 
  FileSpreadsheet, 
  CalendarDays, 
  Edit3, 
  Trash2, 
  Eye, 
  Printer, 
  X, 
  CheckCircle2, 
  Layers, 
  ExternalLink,
  Shield,
  FileText
} from 'lucide-react';

interface EmployeeModuleViewProps {
  employees: Employee[];
  appraisals: AppraisalRecord[];
  monthlyReports: MonthlyReport[];
  jobDescriptions: JobDescription[];
  onAddEmployee: (emp: Employee) => void;
  onUpdateEmployee: (emp: Employee) => void;
  onDeleteEmployee: (id: string) => void;
  onStartAppraisalForEmployee: (emp: Employee) => void;
  onStartReportForEmployee: (emp: Employee) => void;
  currentUser?: AuthUser | null;
  lang: Language;
}

export const EmployeeModuleView: React.FC<EmployeeModuleViewProps> = ({
  employees,
  appraisals,
  monthlyReports,
  jobDescriptions,
  onAddEmployee,
  onUpdateEmployee,
  onDeleteEmployee,
  onStartAppraisalForEmployee,
  onStartReportForEmployee,
  currentUser,
  lang
}) => {
  const isStaff = currentUser?.role === 'employee';

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modal states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [viewingEmployee, setViewingEmployee] = useState<Employee | null>(null);

  // Form Fields State
  const initialFormData: Omit<Employee, 'id'> = {
    employeeId: '',
    fullNameAm: '',
    fullNameEn: '',
    gender: 'ወንድ',
    directorateAm: 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት',
    directorateEn: 'Institutional Technology Administration Directorate',
    teamAm: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
    teamEn: 'Database, Network & System Admin Division',
    positionAm: '',
    positionEn: '',
    jobLevel: 'ደረጃ XIII (Grade XIII)',
    employmentType: 'ቋሚ',
    hireDate: new Date().toISOString().split('T')[0],
    phone: '+251 9',
    email: '@ics.gov.et',
    officeLocation: 'ዋናው ህንፃ',
    status: 'active',
    educationAm: '',
    educationEn: '',
    certifications: [],
    supervisorName: 'ምንዳዬ ሀይሌ (የቡድን መሪ)',
    skills: [],
    notes: '',
    linkedJobId: 'jd-001'
  };

  const [formData, setFormData] = useState<Omit<Employee, 'id'>>(initialFormData);

  // Visible Employees (Staff sees only their own profile)
  const visibleEmployees = useMemo(() => {
    if (isStaff && currentUser) {
      const qId = (currentUser.employeeId || '').toLowerCase();
      const qNameAm = (currentUser.nameAm || '').toLowerCase();
      const qNameEn = (currentUser.nameEn || '').toLowerCase();
      const qEmail = (currentUser.email || '').toLowerCase();

      const matched = employees.filter((emp) => {
        const empId = (emp.employeeId || '').toLowerCase();
        const empNameAm = (emp.fullNameAm || '').toLowerCase();
        const empNameEn = (emp.fullNameEn || '').toLowerCase();
        const empEmail = (emp.email || '').toLowerCase();

        return (
          emp.id === currentUser.id ||
          (qId && empId === qId) ||
          (qNameAm && (empNameAm.includes(qNameAm) || qNameAm.includes(empNameAm))) ||
          (qNameEn && (empNameEn.includes(qNameEn) || qNameEn.includes(empNameEn))) ||
          (qEmail && empEmail === qEmail)
        );
      });

      if (matched.length > 0) return matched;
      return employees.slice(0, 1);
    }
    return employees;
  }, [employees, currentUser, isStaff]);

  // Extract unique teams
  const teamsList = useMemo(() => {
    const set = new Set<string>();
    visibleEmployees.forEach((e) => set.add(e.teamAm));
    return Array.from(set);
  }, [visibleEmployees]);

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return visibleEmployees.filter((emp) => {
      const matchesSearch = 
        emp.fullNameAm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.fullNameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.positionAm.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTeam = selectedTeam === 'all' || emp.teamAm === selectedTeam;
      const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;

      return matchesSearch && matchesTeam && matchesStatus;
    });
  }, [visibleEmployees, searchTerm, selectedTeam, selectedStatus]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = visibleEmployees.length;
    const permanent = visibleEmployees.filter((e) => e.employmentType === 'ቋሚ' || e.employmentType === 'Permanent').length;
    const contract = total - permanent;
    const active = visibleEmployees.filter((e) => e.status === 'active').length;
    const withCerts = visibleEmployees.filter((e) => e.certifications && e.certifications.length > 0).length;
    return { total, permanent, contract, active, withCerts };
  }, [visibleEmployees]);

  // Open Add modal
  const handleOpenAdd = () => {
    setEditingEmployee(null);
    setFormData(initialFormData);
    setIsFormOpen(true);
  };

  // Open Edit modal
  const handleOpenEdit = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({
      employeeId: emp.employeeId,
      fullNameAm: emp.fullNameAm,
      fullNameEn: emp.fullNameEn,
      gender: emp.gender,
      directorateAm: emp.directorateAm,
      directorateEn: emp.directorateEn,
      teamAm: emp.teamAm,
      teamEn: emp.teamEn,
      positionAm: emp.positionAm,
      positionEn: emp.positionEn,
      jobLevel: emp.jobLevel,
      employmentType: emp.employmentType,
      hireDate: emp.hireDate,
      phone: emp.phone,
      email: emp.email,
      officeLocation: emp.officeLocation,
      status: emp.status,
      educationAm: emp.educationAm,
      educationEn: emp.educationEn,
      certifications: emp.certifications,
      supervisorName: emp.supervisorName,
      skills: emp.skills,
      notes: emp.notes || '',
      linkedJobId: emp.linkedJobId || 'jd-001'
    });
    setIsFormOpen(true);
  };

  // Submit Form
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();

    if (editingEmployee) {
      const updated: Employee = {
        ...editingEmployee,
        ...formData,
        certifications: editingEmployee.certifications || [],
        skills: editingEmployee.skills || [],
        notes: editingEmployee.notes || ''
      };
      onUpdateEmployee(updated);
    } else {
      const newEmp: Employee = {
        id: `emp-${Date.now()}`,
        ...formData,
        certifications: [],
        skills: [],
        notes: ''
      };
      onAddEmployee(newEmp);
    }

    setIsFormOpen(false);
  };

  // Helper to get employee appraisals
  const getEmployeeAppraisals = (empId: string, empName: string) => {
    return appraisals.filter(
      (a) => a.metadata.empId === empId || a.metadata.empName.includes(empName)
    );
  };

  // Helper to get employee monthly reports
  const getEmployeeReports = (empId: string, empName: string) => {
    return monthlyReports.filter(
      (r) => r.employeeId === empId || (r.employeeName && r.employeeName.includes(empName))
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & KPI Summary */}
      <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
              <Building2 className="w-4 h-4" />
              <span>{lang === 'am' ? 'የተቋማዊ ቴክኖሎጂ አስተዳደር ዳይሬክቶሬት' : 'IT Administration Directorate'}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {isStaff
                ? (lang === 'am' ? 'የእኔ የግል ፕሮፋይልና የስራ መረጃ' : 'My Personal Staff Profile')
                : (lang === 'am' ? 'የባለሙያዎችና ሰራተኞች ማውጫ' : 'Staff Directory & Profiles')}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              {isStaff
                ? (lang === 'am' ? 'የእርስዎ የስራ መደብ፣ የትምህርት ዝርዝር፣ ሰርተፊኬቶችና የውጤት ታሪክ' : 'Your official job level, qualifications, certifications, and appraisal records.')
                : (lang === 'am' ? 'በዳይሬክቶሬቱ ስር ያሉ የቴክኒክና የአስተዳደር ባለሙያዎች ዝርዝር፣ የሥራ ደረጃ፣ አድራሻ እና የውጤት ታሪክ' : 'Manage technical and administrative staff profiles, positions, certifications, and performance records.')}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {!isStaff && (
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>{lang === 'am' ? 'አዲስ ሰራተኛ መዝግብ' : 'Add New Staff'}</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Metric Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 pt-4">
          <div className="p-3.5 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-blue-800 font-medium block">
                {lang === 'am' ? 'ጠቅላላ ባለሙያዎች' : 'Total Staff'}
              </span>
              <span className="text-xl font-black text-blue-950 font-mono">
                {stats.total}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-emerald-800 font-medium block">
                {lang === 'am' ? 'ቋሚ ሰራተኞች' : 'Permanent Staff'}
              </span>
              <span className="text-xl font-black text-emerald-950 font-mono">
                {stats.permanent} <span className="text-xs text-emerald-700 font-normal">({stats.contract} ኮንትራት)</span>
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-50/60 border border-purple-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-600 text-white flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-purple-800 font-medium block">
                {lang === 'am' ? 'ሰርተፊኬት ያላቸው' : 'Certified Experts'}
              </span>
              <span className="text-xl font-black text-purple-950 font-mono">
                {stats.withCerts}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] text-amber-800 font-medium block">
                {lang === 'am' ? 'የቴክኒክ ቡድኖች' : 'Technical Teams'}
              </span>
              <span className="text-xl font-black text-amber-950 font-mono">
                {teamsList.length}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              lang === 'am' 
                ? 'በስም፣ በመታወቂያ ቁጥር፣ በሥራ መደብ ወይም በኢሜይል ይፈልጉ...' 
                : 'Search by name, employee ID, position, or email...'
            }
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Team Filter */}
          <select
            value={selectedTeam}
            onChange={(e) => setSelectedTeam(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{lang === 'am' ? 'ሁሉም ቡድኖች' : 'All Teams'}</option>
            {teamsList.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs font-semibold bg-slate-50 border border-slate-200 rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">{lang === 'am' ? 'ሁሉም ሁኔታ' : 'All Status'}</option>
            <option value="active">{lang === 'am' ? 'በስራ ላይ (Active)' : 'Active'}</option>
            <option value="on_leave">{lang === 'am' ? 'በፈቃድ ላይ' : 'On Leave'}</option>
          </select>

          {/* View mode toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition ${
                viewMode === 'grid' ? 'bg-white shadow-2xs text-blue-700' : 'text-slate-500'
              }`}
            >
              ካርዶች
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-md font-bold transition ${
                viewMode === 'table' ? 'bg-white shadow-2xs text-blue-700' : 'text-slate-500'
              }`}
            >
              ሰንጠረዥ
            </button>
          </div>
        </div>
      </div>

      {/* Employee List Presentation */}
      {filteredEmployees.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">
            {lang === 'am' ? 'ምንም ሰራተኛ አልተገኘም' : 'No employees found'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            {lang === 'am' ? 'የፈለጉት መረጃ አልተገኘም። እባክዎ ፍተሻውን ያሻሽሉ ወይም አዲስ ሰራተኛ ይመዝግቡ።' : 'Try adjusting your search criteria or register a new staff member.'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {filteredEmployees.map((emp) => {
            const empAppraisals = getEmployeeAppraisals(emp.employeeId, emp.fullNameAm);
            const empReports = getEmployeeReports(emp.employeeId, emp.fullNameAm);
            const latestAppraisal = empAppraisals.length > 0 ? empAppraisals[0] : null;

            return (
              <div
                key={emp.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
              >
                <div>
                  {/* Card Header & Identity */}
                  <div className="p-5 pb-4 border-b border-slate-100 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
                        {emp.fullNameAm.slice(0, 1)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-100">
                            {emp.employeeId}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            {emp.status === 'active' ? (lang === 'am' ? 'በስራ ላይ' : 'Active') : emp.status}
                          </span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1 truncate">
                          {emp.fullNameAm}
                        </h3>
                        <p className="text-xs text-slate-500 truncate">
                          {emp.fullNameEn}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
                        {emp.jobLevel.split(' ')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Position & Team Details */}
                  <div className="p-5 py-3 space-y-2.5 text-xs text-slate-600 border-b border-slate-50 bg-slate-50/30">
                    <div className="flex items-center gap-2 font-medium text-slate-900">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0" />
                      <span className="truncate">{emp.positionAm}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500">
                      <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                      <span className="truncate">{emp.teamAm}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                      <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{emp.email}</span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-500 font-mono text-[11px]">
                      <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{emp.phone}</span>
                    </div>

                    {emp.certifications && emp.certifications.length > 0 && (
                      <div className="pt-1.5 flex flex-wrap gap-1">
                        {emp.certifications.slice(0, 2).map((cert, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 text-[10px] font-semibold bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-100"
                          >
                            <Award className="w-3 h-3 text-purple-500" />
                            {cert}
                          </span>
                        ))}
                        {emp.certifications.length > 2 && (
                          <span className="text-[10px] font-semibold text-slate-400 px-1 py-0.5">
                            +{emp.certifications.length - 2}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Connected Appraisal Status */}
                  <div className="px-5 py-2.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <FileSpreadsheet className="w-3.5 h-3.5 text-blue-500" />
                      <span>ምዘናዎች:</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {empAppraisals.length}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-slate-600">
                      <CalendarDays className="w-3.5 h-3.5 text-emerald-500" />
                      <span>ወርሃዊ ሪፖርት:</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {empReports.length}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-3 bg-white flex items-center justify-between gap-1.5 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setViewingEmployee(emp)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition"
                      title={lang === 'am' ? 'ሙሉ ፕሮፋይል እይ' : 'View Full Profile'}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {!isStaff && (
                      <>
                        <button
                          onClick={() => handleOpenEdit(emp)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition"
                          title={lang === 'am' ? 'መረጃ አሻሽል' : 'Edit Profile'}
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteEmployee(emp.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                          title={lang === 'am' ? 'ሰርዝ' : 'Delete'}
                        >
                          <Trash2 className="w-4 h-4 text-rose-500" />
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onStartReportForEmployee(emp)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 transition cursor-pointer"
                      title="ወርሃዊ ሪፖርት"
                    >
                      <CalendarDays className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="hidden sm:inline">ሪፖርት</span>
                    </button>

                    <button
                      onClick={() => onStartAppraisalForEmployee(emp)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-2xs transition cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5" />
                      <span>ምዘና ጀምር</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table View */
        <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">{lang === 'am' ? 'መታወቂያ' : 'ID'}</th>
                  <th className="py-3.5 px-4">{lang === 'am' ? 'የሰራተኛው ሙሉ ስም' : 'Full Name'}</th>
                  <th className="py-3.5 px-4">{lang === 'am' ? 'የሥራ መደብ' : 'Position'}</th>
                  <th className="py-3.5 px-4">{lang === 'am' ? 'ቡድን / ክፍል' : 'Team / Unit'}</th>
                  <th className="py-3.5 px-4">{lang === 'am' ? 'ደረጃ' : 'Level'}</th>
                  <th className="py-3.5 px-4">{lang === 'am' ? 'አድራሻ' : 'Contact'}</th>
                  <th className="py-3.5 px-4 text-center">{lang === 'am' ? 'ሁኔታ' : 'Status'}</th>
                  <th className="py-3.5 px-4 text-right">{lang === 'am' ? 'እርምጃዎች' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      {emp.employeeId}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{emp.fullNameAm}</div>
                      <div className="text-[11px] text-slate-400">{emp.fullNameEn}</div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {emp.positionAm}
                    </td>
                    <td className="py-3.5 px-4 text-slate-600">
                      {emp.teamAm}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-mono bg-slate-100 px-2 py-0.5 rounded text-[11px] text-slate-700">
                        {emp.jobLevel.split(' ')[0]}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                      <div>{emp.phone}</div>
                      <div className="text-slate-400">{emp.email}</div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        {emp.status === 'active' ? 'በስራ ላይ' : emp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingEmployee(emp)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50"
                          title="ፕሮፋይል እይ"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {!isStaff && (
                          <>
                            <button
                              onClick={() => handleOpenEdit(emp)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-amber-600 hover:bg-amber-50"
                              title="አሻሽል"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => onDeleteEmployee(emp.id)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                              title={lang === 'am' ? 'ሰርዝ' : 'Delete'}
                            >
                              <Trash2 className="w-4 h-4 text-rose-500" />
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => onStartAppraisalForEmployee(emp)}
                          className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          ምዘና
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal 1: Add / Edit Employee Dialog */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                  <UserCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {editingEmployee ? 'የሰራተኛ መረጃ ማስተካከያ' : 'አዲስ ባለሙያ / ሰራተኛ መመዝገቢያ'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    በኢሚግሬሽንና ዜግነት አገልግሎት ስር ያሉ ይፋዊ መረጃዎችን ያስገቡ
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmitForm} className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Employee ID */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የመታወቂያ ቁጥር (Employee ID) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employeeId}
                    onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                    placeholder="ምሳሌ፦ ICS-IT-0842"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                {/* Gender */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ጾታ (Gender)
                  </label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value as Gender })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ወንድ">ወንድ (Male)</option>
                    <option value="ሴት">ሴት (Female)</option>
                  </select>
                </div>

                {/* Full Name Amharic */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ሙሉ ስም (በአማርኛ) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullNameAm}
                    onChange={(e) => setFormData({ ...formData, fullNameAm: e.target.value })}
                    placeholder="ምሳሌ፦ ሊዲያ ግሩም ገብረስላሴ"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Full Name English */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ሙሉ ስም (በእንግሊዝኛ) *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullNameEn}
                    onChange={(e) => setFormData({ ...formData, fullNameEn: e.target.value })}
                    placeholder="e.g. Lydia Girum Gebresilassie"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Position Amharic (Categorized Official Positions) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">
                      የሥራ መደብ መጠሪያ (በአማርኛ)
                    </label>
                    {formData.positionAm && (
                      <button
                        type="button"
                        onClick={() =>
                          setFormData({
                            ...formData,
                            positionAm: '',
                            positionEn: '',
                            linkedJobId: undefined
                          })
                        }
                        className="text-[10px] text-rose-600 hover:text-rose-700 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        title="የስራ መደቡን አስወግድ"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>የስራ መደብ አስወግድ</span>
                      </button>
                    )}
                  </div>
                  <select
                    value={formData.positionAm}
                    onChange={(e) => {
                      const sel = e.target.value;
                      if (!sel) {
                        setFormData({ 
                          ...formData, 
                          positionAm: '', 
                          positionEn: '',
                          linkedJobId: undefined 
                        });
                        return;
                      }
                      const found = OFFICIAL_STAFF_POSITIONS.find(
                        (p) => p.titleAm === sel || p.titleAm.replace(/ዎ/g, 'ወ') === sel.replace(/ዎ/g, 'ወ')
                      );
                      if (found) {
                        const gradeToLevel: Record<string, string> = {
                          'ደረጃ XIII': 'ደረጃ XIII (Grade XIII)',
                          'ደረጃ XII': 'ደረጃ XII (Grade XII)',
                          'ደረጃ XI': 'ደረጃ XI (Grade XI)',
                          'ደረጃ X': 'ደረጃ X (Grade X)'
                        };
                        setFormData({
                          ...formData,
                          positionAm: sel,
                          positionEn: found.titleEn,
                          jobLevel: gradeToLevel[found.grade] || found.grade,
                          teamAm: 'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
                          teamEn: 'Database, Network & System Admin Division',
                          linkedJobId: found.id
                        });
                      } else {
                        setFormData({ ...formData, positionAm: sel });
                      }
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">-- የስራ መደብ የለም / አስወግድ --</option>
                    <optgroup label="🌐 የኔትዎርክ አስተዳደር (Network Administration)">
                      <option value="ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII">ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII</option>
                      <option value="መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII">መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII</option>
                      <option value="ረዳት የኔትወርክ ባለሙያ ደረጃ XI">ረዳት የኔትወርክ ባለሙያ ደረጃ XI</option>
                      <option value="ጀማሪ የኔትወርክ ባለሙያ ደረጃ X">ጀማሪ የኔትወርክ ባለሙያ ደረጃ X</option>
                    </optgroup>
                    <optgroup label="💾 የዳታቤዝ አስተዳደር (Database Administration)">
                      <option value="ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII">ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII</option>
                      <option value="መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII">መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII</option>
                      <option value="ረዳት የዳታቤዝ ባለሙያ ደረጃ XI">ረዳት የዳታቤዝ ባለሙያ ደረጃ XI</option>
                      <option value="ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X">ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X</option>
                    </optgroup>
                    <optgroup label="🖥️ የሲስተም አስተዳደር (System Administration)">
                      <option value="ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII">ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII</option>
                      <option value="መካከለኛ የሲስተም ባለሙያ ደረጃ XII">መካከለኛ የሲስተም ባለሙያ ደረጃ XII</option>
                      <option value="ረዳት የሲስተም ባለሙያ ደረጃ XI">ረዳት የሲስተም ባለሙያ ደረጃ XI</option>
                      <option value="ጀማሪ የሲስተም ባለሙያ ደረጃ X">ጀማሪ የሲስተም ባለሙያ ደረጃ X</option>
                    </optgroup>
                    {formData.positionAm &&
                      !['ከፍተኛ የኔትወርክ ባለሙያ ደረጃ XIII', 'መካከለኛ የኔትወርክ ባለሙያ ደረጃ XII', 'መካከለኛ የኔትዎርክ ባለሙያ ደረጃ XII', 'ረዳት የኔትወርክ ባለሙያ ደረጃ XI', 'ጀማሪ የኔትወርክ ባለሙያ ደረጃ X', 'ከፍተኛ የዳታቤዝ ባለሙያ ደረጃ XIII', 'መካከለኛ የዳታቤዝ ባለሙያ ደረጃ XII', 'ረዳት የዳታቤዝ ባለሙያ ደረጃ XI', 'ጀማሪ የዳታቤዝ ባለሙያ ደረጃ X', 'ከፍተኛ የሲስተም ባለሙያ ደረጃ XIII', 'መካከለኛ የሲስተም ባለሙያ ደረጃ XII', 'ረዳት የሲስተም ባለሙያ ደረጃ XI', 'ጀማሪ የሲስተም ባለሙያ ደረጃ X'].includes(formData.positionAm) && (
                        <optgroup label="ሌላ / የተለየ የስራ መደብ">
                          <option value={formData.positionAm}>{formData.positionAm}</option>
                        </optgroup>
                      )}
                  </select>
                </div>

                {/* Position English */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የሥራ መደብ (በእንግሊዝኛ)
                  </label>
                  <input
                    type="text"
                    value={formData.positionEn}
                    onChange={(e) => setFormData({ ...formData, positionEn: e.target.value })}
                    placeholder="e.g. Senior Network Engineer"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Team / Unit / Division */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የተመደበበት ቡድን / ክፍል
                  </label>
                  <select
                    value={formData.teamAm}
                    onChange={(e) => {
                      const val = e.target.value;
                      const enMap: Record<string, string> = {
                        'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን': 'Database, Network & System Admin Division',
                        'የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን': 'Branch IT Support Admin Division',
                        'የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን': 'IT Support Services Admin Division'
                      };
                      setFormData({
                        ...formData,
                        teamAm: val,
                        teamEn: enMap[val] || formData.teamEn
                      });
                    }}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን">የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን</option>
                    <option value="የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን">የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን</option>
                    <option value="የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን">የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን</option>
                    {formData.teamAm &&
                      ![
                        'የዳታቤዝ፣ ኔትዎርክና ሲስተም አስር ዲቪዥን',
                        'የቅርጫፍ_ኢንፎ_ቴክ_ድጋፍ_አስር ዲቪዥን',
                        'የኢንፎ_ቴክ_ድጋፍ_አገልግሎት_አስር ዲቪዥን'
                      ].includes(formData.teamAm) && (
                        <option value={formData.teamAm}>{formData.teamAm}</option>
                      )}
                  </select>
                </div>

                {/* Job Level */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የሥራ ደረጃ (Grade Level)
                  </label>
                  <select
                    value={formData.jobLevel}
                    onChange={(e) => setFormData({ ...formData, jobLevel: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="ደረጃ XIV (Grade XIV)">ደረጃ XIV (Grade XIV)</option>
                    <option value="ደረጃ XIII (Grade XIII)">ደረጃ XIII (Grade XIII)</option>
                    <option value="ደረጃ XII (Grade XII)">ደረጃ XII (Grade XII)</option>
                    <option value="ደረጃ XI (Grade XI)">ደረጃ XI (Grade XI)</option>
                    <option value="ደረጃ X (Grade X)">ደረጃ X (Grade X)</option>
                  </select>
                </div>

                {/* Hire Date */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የተቀጠረበት ቀን (Hire Date)
                  </label>
                  <input
                    type="date"
                    value={formData.hireDate}
                    onChange={(e) => setFormData({ ...formData, hireDate: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ስልክ ቁጥር
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+251 91 123 4567"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    ኢሜይል (Official Email)
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@ics.gov.et"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono"
                  />
                </div>

                {/* Office Location */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የቢሮ አድራሻ / ክፍል
                  </label>
                  <input
                    type="text"
                    value={formData.officeLocation}
                    onChange={(e) => setFormData({ ...formData, officeLocation: e.target.value })}
                    placeholder="ዋናው ህንፃ ቢሮ ቁጥር 304"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Supervisor Name */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    የቅርብ ኃላፊ ስም
                  </label>
                  <input
                    type="text"
                    value={formData.supervisorName}
                    onChange={(e) => setFormData({ ...formData, supervisorName: e.target.value })}
                    placeholder="ምንዳዬ ሀይሌ (የቡድን መሪ)"
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Education */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  የትምህርት ደረጃ እና ዝግጅት
                </label>
                <input
                  type="text"
                  value={formData.educationAm}
                  onChange={(e) => setFormData({ ...formData, educationAm: e.target.value })}
                  placeholder="ምሳሌ፦ በኮምፒውተር ምህንድስና የማስተርስ ዲግሪ (MSc)"
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Form Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition"
                >
                  ሰርዝ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                >
                  {editingEmployee ? 'አሻሽል አስቀምጥ' : 'ሰራተኛውን መዝግብ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal 2: Employee Profile & Performance History Sheet */}
      {viewingEmployee && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {viewingEmployee.fullNameAm.slice(0, 1)}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    የባለሙያ ይፋዊ ፕሮፋይል ማጠቃለያ
                  </h3>
                  <p className="text-xs text-slate-500">
                    {viewingEmployee.fullNameAm} ({viewingEmployee.employeeId})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onDeleteEmployee(viewingEmployee.id);
                    setViewingEmployee(null);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-600 hover:text-rose-700 transition cursor-pointer"
                  title={lang === 'am' ? 'ሰርዝ' : 'Delete'}
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                  <span>{lang === 'am' ? 'ሰርዝ' : 'Delete'}</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>አትም</span>
                </button>
                <button
                  onClick={() => setViewingEmployee(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Header Badge */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-blue-950 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                      {viewingEmployee.employeeId}
                    </span>
                    <span className="text-xs text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                      {viewingEmployee.status === 'active' ? 'በስራ ላይ (Active)' : viewingEmployee.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-black">{viewingEmployee.fullNameAm}</h2>
                  <p className="text-sm text-slate-300">{viewingEmployee.fullNameEn}</p>
                  <p className="text-xs text-blue-300 mt-1 font-medium">{viewingEmployee.positionAm} • {viewingEmployee.jobLevel}</p>
                </div>

                <div className="text-right sm:border-l sm:border-slate-700/60 sm:pl-6">
                  <span className="text-[11px] text-slate-400 block">የተመደበበት ቡድን</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{viewingEmployee.teamAm}</span>
                  <span className="text-[11px] text-slate-400 block mt-2">የቅጥር ሁኔታ</span>
                  <span className="text-xs font-semibold text-emerald-300 block">{viewingEmployee.employmentType}</span>
                </div>
              </div>

              {/* Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Official Information */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-blue-600" />
                    <span>ተቋማዊ መረጃ</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">ዳይሬክቶሬት:</span>
                      <span className="font-semibold text-slate-800 text-right">{viewingEmployee.directorateAm}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">የቅርብ ኃላፊ:</span>
                      <span className="font-semibold text-slate-800">{viewingEmployee.supervisorName}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">የቅጥር ዘመን:</span>
                      <span className="font-mono font-semibold text-slate-800">{viewingEmployee.hireDate}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-500">የቢሮ አድራሻ:</span>
                      <span className="font-semibold text-slate-800">{viewingEmployee.officeLocation}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Education */}
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span>ትምህርትና አድራሻ</span>
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">ስልክ:</span>
                      <span className="font-mono font-semibold text-slate-800">{viewingEmployee.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">ኢሜይል:</span>
                      <span className="font-mono font-semibold text-slate-800">{viewingEmployee.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200/60 pb-1.5">
                      <span className="text-slate-500">የትምህርት ደረጃ:</span>
                      <span className="font-semibold text-slate-800 text-right">{viewingEmployee.educationAm}</span>
                    </div>
                    <div className="flex justify-between pb-1">
                      <span className="text-slate-500">ፆታ:</span>
                      <span className="font-semibold text-slate-800">{viewingEmployee.gender}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications and Skills */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span>ሰርተፊኬቶችና ቴክኒካል ክህሎቶች</span>
                </h4>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1.5">
                    {viewingEmployee.certifications.map((c, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-bold bg-purple-50 text-purple-800 border border-purple-200 flex items-center gap-1.5">
                        <Award className="w-3.5 h-3.5 text-purple-600" />
                        {c}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {viewingEmployee.skills.map((s, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-700">
                        #{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Performance Appraisals History */}
              <div className="p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-blue-600" />
                    <span>የተመዘገቡ የሥራ አፈጻጸም ምዘናዎች</span>
                  </h4>
                  <button
                    onClick={() => {
                      onStartAppraisalForEmployee(viewingEmployee);
                      setViewingEmployee(null);
                    }}
                    className="text-xs font-bold text-blue-600 hover:text-blue-800"
                  >
                    + አዲስ ምዘና ጀምር
                  </button>
                </div>

                {getEmployeeAppraisals(viewingEmployee.employeeId, viewingEmployee.fullNameAm).length === 0 ? (
                  <p className="text-xs text-slate-500 py-3 italic">
                    ለዚህ ሰራተኛ የተመዘገበ ይፋዊ የምዘና ሪኮርድ የለም።
                  </p>
                ) : (
                  <div className="divide-y divide-slate-100">
                    {getEmployeeAppraisals(viewingEmployee.employeeId, viewingEmployee.fullNameAm).map((app) => (
                      <div key={app.id} className="py-2.5 flex items-center justify-between text-xs">
                        <div>
                          <div className="font-bold text-slate-900">{app.metadata.evalPeriod} ({app.metadata.evalDate})</div>
                          <div className="text-[11px] text-slate-500">ኃላፊ፦ {app.metadata.supervisorName}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-blue-700 text-sm">
                            {app.approvalStatus === 'approved' ? 'የጸደቀ' : 'በሂደት ላይ'}
                          </span>
                          <button
                            onClick={() => {
                              onStartAppraisalForEmployee(viewingEmployee);
                              setViewingEmployee(null);
                            }}
                            className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-bold hover:bg-blue-100"
                          >
                            ክፈት
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
              <button
                onClick={() => {
                  onDeleteEmployee(viewingEmployee.id);
                  setViewingEmployee(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-rose-600 hover:bg-rose-50 transition"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>ሰራተኛውን ሰርዝ</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    handleOpenEdit(viewingEmployee);
                    setViewingEmployee(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-200 hover:bg-slate-300 text-slate-800 transition"
                >
                  መረጃውን አሻሽል
                </button>
                <button
                  onClick={() => {
                    onStartAppraisalForEmployee(viewingEmployee);
                    setViewingEmployee(null);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition"
                >
                  ወደ ምዘና ቅጽ ሂድ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
