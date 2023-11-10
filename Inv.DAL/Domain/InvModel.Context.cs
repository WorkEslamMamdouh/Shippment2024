﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Inv.DAL.Domain
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    using System.Data.Entity.Core.Objects;
    using System.Linq;
    
    public partial class InvEntities : DbContext
    {
        public InvEntities()
            : base("name=InvEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<A_Pay_D_VendorDoc> A_Pay_D_VendorDoc { get; set; }
        public virtual DbSet<G_AlertType> G_AlertType { get; set; }
        public virtual DbSet<G_BRANCH> G_BRANCH { get; set; }
        public virtual DbSet<G_BranchModules> G_BranchModules { get; set; }
        public virtual DbSet<G_Codes> G_Codes { get; set; }
        public virtual DbSet<G_COMPANY> G_COMPANY { get; set; }
        public virtual DbSet<G_CONTROL> G_CONTROL { get; set; }
        public virtual DbSet<G_MODULES> G_MODULES { get; set; }
        public virtual DbSet<G_ReportWebSetting> G_ReportWebSetting { get; set; }
        public virtual DbSet<G_Role> G_Role { get; set; }
        public virtual DbSet<G_RoleBranch> G_RoleBranch { get; set; }
        public virtual DbSet<G_RoleModule> G_RoleModule { get; set; }
        public virtual DbSet<G_RoleUsers> G_RoleUsers { get; set; }
        public virtual DbSet<G_SearchForm> G_SearchForm { get; set; }
        public virtual DbSet<G_SearchFormModule> G_SearchFormModule { get; set; }
        public virtual DbSet<G_SearchFormSetting> G_SearchFormSetting { get; set; }
        public virtual DbSet<G_SUB_SYSTEMS> G_SUB_SYSTEMS { get; set; }
        public virtual DbSet<G_SYSTEM> G_SYSTEM { get; set; }
        public virtual DbSet<G_USER_BRANCH> G_USER_BRANCH { get; set; }
        public virtual DbSet<G_USER_COMPANY> G_USER_COMPANY { get; set; }
        public virtual DbSet<G_UserPrivillage> G_UserPrivillage { get; set; }
        public virtual DbSet<I_Control> I_Control { get; set; }
        public virtual DbSet<PromoCodes> PromoCodes { get; set; }
        public virtual DbSet<HIJRA_CONVERT> HIJRA_CONVERT { get; set; }
        public virtual DbSet<G_USER_LOG> G_USER_LOG { get; set; }
        public virtual DbSet<GQ_GetRoleModule> GQ_GetRoleModule { get; set; }
        public virtual DbSet<GQ_GetUserBarnchAccess> GQ_GetUserBarnchAccess { get; set; }
        public virtual DbSet<GQ_GetUserBranch> GQ_GetUserBranch { get; set; }
        public virtual DbSet<GQ_GetUserRole> GQ_GetUserRole { get; set; }
        public virtual DbSet<GQ_GetUsers> GQ_GetUsers { get; set; }
        public virtual DbSet<GQ_ReportWebSetting> GQ_ReportWebSetting { get; set; }
        public virtual DbSet<I_VW_GetCompStatus> I_VW_GetCompStatus { get; set; }
        public virtual DbSet<IQ_GetSalesMan> IQ_GetSalesMan { get; set; }
        public virtual DbSet<IQ_GetVendor> IQ_GetVendor { get; set; }
        public virtual DbSet<Sls_Invoice> Sls_Invoice { get; set; }
        public virtual DbSet<G_USERS> G_USERS { get; set; }
        public virtual DbSet<A_Pay_D_Vendor> A_Pay_D_Vendor { get; set; }
        public virtual DbSet<I_Sls_D_Salesman> I_Sls_D_Salesman { get; set; }
        public virtual DbSet<Vnd_Inv_SlsMan> Vnd_Inv_SlsMan { get; set; }
        public virtual DbSet<Zones> Zones { get; set; }
        public virtual DbSet<Sls_InvoiceItem> Sls_InvoiceItem { get; set; }
        public virtual DbSet<A_ACCOUNT> A_ACCOUNT { get; set; }
        public virtual DbSet<A_ACCOUNT_YEAR> A_ACCOUNT_YEAR { get; set; }
        public virtual DbSet<A_JOURNAL_DETAIL> A_JOURNAL_DETAIL { get; set; }
        public virtual DbSet<A_JOURNAL_HEADER> A_JOURNAL_HEADER { get; set; }
        public virtual DbSet<A_RecPay_Tr_ReceiptNote> A_RecPay_Tr_ReceiptNote { get; set; }
        public virtual DbSet<G_STORE> G_STORE { get; set; }
    
        public virtual int G_ProcessTransVer2(Nullable<int> comp, Nullable<int> branch, string trType, string opMode, Nullable<int> trID, ObjectParameter trNo, ObjectParameter ok)
        {
            var compParameter = comp.HasValue ?
                new ObjectParameter("Comp", comp) :
                new ObjectParameter("Comp", typeof(int));
    
            var branchParameter = branch.HasValue ?
                new ObjectParameter("Branch", branch) :
                new ObjectParameter("Branch", typeof(int));
    
            var trTypeParameter = trType != null ?
                new ObjectParameter("TrType", trType) :
                new ObjectParameter("TrType", typeof(string));
    
            var opModeParameter = opMode != null ?
                new ObjectParameter("OpMode", opMode) :
                new ObjectParameter("OpMode", typeof(string));
    
            var trIDParameter = trID.HasValue ?
                new ObjectParameter("TrID", trID) :
                new ObjectParameter("TrID", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("G_ProcessTransVer2", compParameter, branchParameter, trTypeParameter, opModeParameter, trIDParameter, trNo, ok);
        }
    
        public virtual int G_TOL_GetCounter(string system, Nullable<int> comp, Nullable<int> branch, Nullable<System.DateTime> dt, string trType, ObjectParameter trNo)
        {
            var systemParameter = system != null ?
                new ObjectParameter("System", system) :
                new ObjectParameter("System", typeof(string));
    
            var compParameter = comp.HasValue ?
                new ObjectParameter("Comp", comp) :
                new ObjectParameter("Comp", typeof(int));
    
            var branchParameter = branch.HasValue ?
                new ObjectParameter("Branch", branch) :
                new ObjectParameter("Branch", typeof(int));
    
            var dtParameter = dt.HasValue ?
                new ObjectParameter("dt", dt) :
                new ObjectParameter("dt", typeof(System.DateTime));
    
            var trTypeParameter = trType != null ?
                new ObjectParameter("TrType", trType) :
                new ObjectParameter("TrType", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("G_TOL_GetCounter", systemParameter, compParameter, branchParameter, dtParameter, trTypeParameter, trNo);
        }
    
        public virtual int G_TOL_GetCounterComp(string system, Nullable<int> comp, Nullable<int> branch, Nullable<System.DateTime> dt, string trType, ObjectParameter trNo)
        {
            var systemParameter = system != null ?
                new ObjectParameter("System", system) :
                new ObjectParameter("System", typeof(string));
    
            var compParameter = comp.HasValue ?
                new ObjectParameter("Comp", comp) :
                new ObjectParameter("Comp", typeof(int));
    
            var branchParameter = branch.HasValue ?
                new ObjectParameter("Branch", branch) :
                new ObjectParameter("Branch", typeof(int));
    
            var dtParameter = dt.HasValue ?
                new ObjectParameter("dt", dt) :
                new ObjectParameter("dt", typeof(System.DateTime));
    
            var trTypeParameter = trType != null ?
                new ObjectParameter("TrType", trType) :
                new ObjectParameter("TrType", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("G_TOL_GetCounterComp", systemParameter, compParameter, branchParameter, dtParameter, trTypeParameter, trNo);
        }
    
        [DbFunction("InvEntities", "GFun_Companies")]
        public virtual IQueryable<GFun_Companies_Result> GFun_Companies(string userCode)
        {
            var userCodeParameter = userCode != null ?
                new ObjectParameter("userCode", userCode) :
                new ObjectParameter("userCode", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<GFun_Companies_Result>("[InvEntities].[GFun_Companies](@userCode)", userCodeParameter);
        }
    
        [DbFunction("InvEntities", "GFun_UserCompanyBranch")]
        public virtual IQueryable<GFun_UserCompanyBranch_Result> GFun_UserCompanyBranch(string userCode, Nullable<int> compCode)
        {
            var userCodeParameter = userCode != null ?
                new ObjectParameter("userCode", userCode) :
                new ObjectParameter("userCode", typeof(string));
    
            var compCodeParameter = compCode.HasValue ?
                new ObjectParameter("CompCode", compCode) :
                new ObjectParameter("CompCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<GFun_UserCompanyBranch_Result>("[InvEntities].[GFun_UserCompanyBranch](@userCode, @CompCode)", userCodeParameter, compCodeParameter);
        }
    
        [DbFunction("InvEntities", "GFunc_GetPrivilage")]
        public virtual IQueryable<GFunc_GetPrivilage_Result> GFunc_GetPrivilage(Nullable<int> year, Nullable<int> comp, Nullable<int> bra, string user, string sys, string mod)
        {
            var yearParameter = year.HasValue ?
                new ObjectParameter("year", year) :
                new ObjectParameter("year", typeof(int));
    
            var compParameter = comp.HasValue ?
                new ObjectParameter("Comp", comp) :
                new ObjectParameter("Comp", typeof(int));
    
            var braParameter = bra.HasValue ?
                new ObjectParameter("bra", bra) :
                new ObjectParameter("bra", typeof(int));
    
            var userParameter = user != null ?
                new ObjectParameter("user", user) :
                new ObjectParameter("user", typeof(string));
    
            var sysParameter = sys != null ?
                new ObjectParameter("Sys", sys) :
                new ObjectParameter("Sys", typeof(string));
    
            var modParameter = mod != null ?
                new ObjectParameter("Mod", mod) :
                new ObjectParameter("Mod", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<GFunc_GetPrivilage_Result>("[InvEntities].[GFunc_GetPrivilage](@year, @Comp, @bra, @user, @Sys, @Mod)", yearParameter, compParameter, braParameter, userParameter, sysParameter, modParameter);
        }
    
        [DbFunction("InvEntities", "GFunc_GetPrivilageRole")]
        public virtual IQueryable<GFunc_GetPrivilageRole_Result> GFunc_GetPrivilageRole(Nullable<int> comp, Nullable<int> bra, string user, string sys, string sub, string mod)
        {
            var compParameter = comp.HasValue ?
                new ObjectParameter("Comp", comp) :
                new ObjectParameter("Comp", typeof(int));
    
            var braParameter = bra.HasValue ?
                new ObjectParameter("bra", bra) :
                new ObjectParameter("bra", typeof(int));
    
            var userParameter = user != null ?
                new ObjectParameter("user", user) :
                new ObjectParameter("user", typeof(string));
    
            var sysParameter = sys != null ?
                new ObjectParameter("Sys", sys) :
                new ObjectParameter("Sys", typeof(string));
    
            var subParameter = sub != null ?
                new ObjectParameter("sub", sub) :
                new ObjectParameter("sub", typeof(string));
    
            var modParameter = mod != null ?
                new ObjectParameter("Mod", mod) :
                new ObjectParameter("Mod", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<GFunc_GetPrivilageRole_Result>("[InvEntities].[GFunc_GetPrivilageRole](@Comp, @bra, @user, @Sys, @sub, @Mod)", compParameter, braParameter, userParameter, sysParameter, subParameter, modParameter);
        }
    
        [DbFunction("InvEntities", "GFunc_GetPrivilageVer3")]
        public virtual IQueryable<GFunc_GetPrivilageVer3_Result> GFunc_GetPrivilageVer3(Nullable<int> year, Nullable<int> comp, Nullable<int> bra, string user, string sys, string mod)
        {
            var yearParameter = year.HasValue ?
                new ObjectParameter("year", year) :
                new ObjectParameter("year", typeof(int));
    
            var compParameter = comp.HasValue ?
                new ObjectParameter("Comp", comp) :
                new ObjectParameter("Comp", typeof(int));
    
            var braParameter = bra.HasValue ?
                new ObjectParameter("bra", bra) :
                new ObjectParameter("bra", typeof(int));
    
            var userParameter = user != null ?
                new ObjectParameter("user", user) :
                new ObjectParameter("user", typeof(string));
    
            var sysParameter = sys != null ?
                new ObjectParameter("Sys", sys) :
                new ObjectParameter("Sys", typeof(string));
    
            var modParameter = mod != null ?
                new ObjectParameter("Mod", mod) :
                new ObjectParameter("Mod", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.CreateQuery<GFunc_GetPrivilageVer3_Result>("[InvEntities].[GFunc_GetPrivilageVer3](@year, @Comp, @bra, @user, @Sys, @Mod)", yearParameter, compParameter, braParameter, userParameter, sysParameter, modParameter);
        }
    
        public virtual int GLnk_GenerateTrans(Nullable<int> comp, Nullable<int> bra, string user, string sys, string tRType, string fromDate, string toDate, Nullable<int> fromno, Nullable<int> toNo)
        {
            var compParameter = comp.HasValue ?
                new ObjectParameter("comp", comp) :
                new ObjectParameter("comp", typeof(int));
    
            var braParameter = bra.HasValue ?
                new ObjectParameter("Bra", bra) :
                new ObjectParameter("Bra", typeof(int));
    
            var userParameter = user != null ?
                new ObjectParameter("User", user) :
                new ObjectParameter("User", typeof(string));
    
            var sysParameter = sys != null ?
                new ObjectParameter("Sys", sys) :
                new ObjectParameter("Sys", typeof(string));
    
            var tRTypeParameter = tRType != null ?
                new ObjectParameter("TRType", tRType) :
                new ObjectParameter("TRType", typeof(string));
    
            var fromDateParameter = fromDate != null ?
                new ObjectParameter("FromDate", fromDate) :
                new ObjectParameter("FromDate", typeof(string));
    
            var toDateParameter = toDate != null ?
                new ObjectParameter("ToDate", toDate) :
                new ObjectParameter("ToDate", typeof(string));
    
            var fromnoParameter = fromno.HasValue ?
                new ObjectParameter("Fromno", fromno) :
                new ObjectParameter("Fromno", typeof(int));
    
            var toNoParameter = toNo.HasValue ?
                new ObjectParameter("ToNo", toNo) :
                new ObjectParameter("ToNo", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GLnk_GenerateTrans", compParameter, braParameter, userParameter, sysParameter, tRTypeParameter, fromDateParameter, toDateParameter, fromnoParameter, toNoParameter);
        }
    
        public virtual int GProc_CreateBranch(Nullable<int> comp, Nullable<int> bra)
        {
            var compParameter = comp.HasValue ?
                new ObjectParameter("comp", comp) :
                new ObjectParameter("comp", typeof(int));
    
            var braParameter = bra.HasValue ?
                new ObjectParameter("bra", bra) :
                new ObjectParameter("bra", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GProc_CreateBranch", compParameter, braParameter);
        }
    
        public virtual int GProc_CreateUser(string user, string likeUser)
        {
            var userParameter = user != null ?
                new ObjectParameter("User", user) :
                new ObjectParameter("User", typeof(string));
    
            var likeUserParameter = likeUser != null ?
                new ObjectParameter("LikeUser", likeUser) :
                new ObjectParameter("LikeUser", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GProc_CreateUser", userParameter, likeUserParameter);
        }
    
        public virtual int GProc_GenerateBranchModules(Nullable<int> compCode, Nullable<int> braCode)
        {
            var compCodeParameter = compCode.HasValue ?
                new ObjectParameter("CompCode", compCode) :
                new ObjectParameter("CompCode", typeof(int));
    
            var braCodeParameter = braCode.HasValue ?
                new ObjectParameter("BraCode", braCode) :
                new ObjectParameter("BraCode", typeof(int));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GProc_GenerateBranchModules", compCodeParameter, braCodeParameter);
        }
    
        public virtual int GProc_GenerateUserPrivilage(Nullable<int> compCode, Nullable<int> braCode, string user)
        {
            var compCodeParameter = compCode.HasValue ?
                new ObjectParameter("CompCode", compCode) :
                new ObjectParameter("CompCode", typeof(int));
    
            var braCodeParameter = braCode.HasValue ?
                new ObjectParameter("BraCode", braCode) :
                new ObjectParameter("BraCode", typeof(int));
    
            var userParameter = user != null ?
                new ObjectParameter("user", user) :
                new ObjectParameter("user", typeof(string));
    
            return ((IObjectContextAdapter)this).ObjectContext.ExecuteFunction("GProc_GenerateUserPrivilage", compCodeParameter, braCodeParameter, userParameter);
        }
    }
}
