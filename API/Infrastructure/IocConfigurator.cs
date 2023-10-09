﻿using Unity;
using Inv.DAL.Repository;
using Inv.BLL.Services.GUSERS;
using Inv.BLL.Services.CompStatus;
using Inv.BLL.Services.IControl;
//using Inv.BLL.Services.GCONTROL;
using Inv.BLL.Services.Nationality;
using Inv.BLL.Services.AD_VAT_TYPE;
using Inv.BLL.Services.StkDefCategory;
using Inv.BLL.Services.GenDefCategory;
using Inv.BLL.Services.GenDefGroup;
using Inv.BLL.Services.StkDefItemType;
using Inv.BLL.Services.ItemDef;
using Inv.BLL.Services.GLDefAccount;
using Inv.BLL.Services.AccDefAccounts;
using Inv.BLL.Services.AccDefCustomer;
using Inv.BLL.Services.AccDefSalesMen;
using Inv.BLL.Services.AccDefBox;
using Inv.BLL.Services.AccDefVendor;
using Inv.BLL.Services.StkDefStore;
using Inv.BLL.Services.StkDefUnit;
using Inv.BLL.Services.GenDefAdjustment;
using Inv.BLL.Services.GenVatType;
using Inv.BLL.Services.ISlsTRInvoice;
using Inv.BLL.Services.SlsInvoiceItems;
using Inv.BLL.Services.AccTrReceipt;
using Inv.BLL.Services.IGCodes;
using Inv.BLL.Services.PurTrReceive;
using Inv.BLL.Services.PurInvoiceItems;
using Inv.BLL.Services.PurDefCharges;
using Inv.BLL.Services.AccTrAdjust;
using Inv.BLL.Services.PurTRCharges;
using Inv.BLL.Services.Processes;
using Inv.BLL.Services.OperationItems;
using Inv.BLL.Services.operationItemsSum;
using Inv.BLL.Services.OperationCharges;
using Inv.BLL.Services.OperationDeposit;
using Inv.BLL.Services.GLTrVoucher;
using Inv.BLL.Services.VoucherType;
using Inv.BLL.Services.GCostCenter;
using Inv.BLL.Services.JournalHeader;
using Inv.BLL.Services.JournalDetail;
using Inv.BLL.Services.TmpVoucherProcess;
using Inv.BLL.Services.VchrTemplateHeader;
using Inv.BLL.Services.VchrTemplateDetail;
using Inv.BLL.Services.GRole;
using Inv.BLL.Services.GRoleUsers;
using Inv.BLL.Services.GLDefAccount_year;
using Inv.BLL.Services.G_Control;
using Inv.BLL.Services.ItemDefYear;
using Inv.BLL.Services.GBRANCH;
using Inv.BLL.Services.LnkVarBranch;
using Inv.BLL.Services.Glnktrans;
using Inv.BLL.Services.GlnktransTemp;
using Inv.BLL.Services.G_SUB_SYSTEM;
using Inv.BLL.Services.G_LnkTran;
using Inv.BLL.Services.G_LnkTransVoucherr;
using Inv.BLL.Services.DirectTransfer;
using Inv.BLL.Services.G_LnkTransVariables;
using Inv.BLL.Services.G_LnkVarr;
using Inv.BLL.Services.USER_BRANCH;
using Inv.BLL.Services.StckAdjust;
using Inv.BLL.Services.GenDefAdd;
using Inv.BLL.Services.PurOrder;
using Inv.BLL.Services.DefStoree;
using Inv.BLL.Services.SalesTrans;
using Inv.BLL.Services.VatNature;
using Inv.BLL.Services.AVATSrvCategory;
using Inv.BLL.Services.AVatDService;
using Inv.BLL.Services.ServiceTRInvoice;
using Inv.BLL.Services.ServSlsInvoiceItems;
using Inv.BLL.Services.ServPurInvoice;
using Inv.BLL.Services.ServPurInvoiceDetail;
using Inv.BLL.Services.ServPurInvoiceHeader;
using Inv.BLL.Services.OperationSalesmanItem;

using Inv.BLL.Services.AVATPurInvoiceRet;
using Inv.BLL.Services.AVATPurInvoiceRetDetail;
using Inv.BLL.Services.GCompany;
using Inv.BLL.Services.GAlertControl;
using Inv.BLL.Services.AccDtTypes;
using Inv.BLL.Services.AccDtCostCenters;
using Inv.BLL.Services.AVATCONTROL;
using Inv.BLL.Services.AVATPERIOD;
using Inv.BLL.Services.AVATTRANS;
using Inv.BLL.Services.CashVoucher;
using Inv.BLL.Services.AVAT_D_Servicee;
using Inv.BLL.Services.G_Branch;
using Inv.BLL.Services.ITRCollect;
using Inv.BLL.Services.I_PeriodSer;
using Inv.BLL.Services.Stk_TR_IssueToCC;
using Inv.BLL.Services.STKOpen;
using Inv.BLL.Services.LnkVoucherDetail;
using Inv.BLL.Services.ACCOUNT_GROUP;

namespace Inv.API.Infrastructure
{
    public static class IocConfigurator
    {

        public static void RegisterServices(IUnityContainer container)
        {
            container.RegisterType<IUnitOfWork, UnitOfWork>();

            container.RegisterType<IG_USERSService, G_USERSService>();
            container.RegisterType<II_VW_GetCompStatusService, I_VW_GetCompStatusService>();
            container.RegisterType<II_ControlService, I_ControlService>();
            container.RegisterType<IG_BranchService, G_BranchService>();

            container.RegisterType<INationalityService, NationalityService>();
            container.RegisterType<IA_D_VAT_TypeService, A_D_VAT_TypeService>();
            container.RegisterType<IStkDefCategoryService, StkDefCategoryService>();
            container.RegisterType<IGenDefCategoryService, GenDefCategoryService>();
            container.RegisterType<IGenDefGroupService, GenDefGroupService>();
            container.RegisterType<IStkDefItemTypeService, StkDefItemTypeService>();
            container.RegisterType<IItemDefService, ItemDefService>();
            container.RegisterType<IGLDefAccountService, GLDefAccountService>();
            container.RegisterType<IAccDefAccountsService, AccDefAccountsService>();
            container.RegisterType<IAccDefCustomerService, AccDefCustomerService>();
            container.RegisterType<IAccDefSalesMenService, AccDefSalesMenService>();
            container.RegisterType<IAccDefBoxService, AccDefBoxService>();
            container.RegisterType<IAccDefVendorService, AccDefVendorService>();
            container.RegisterType<IStkDefStoreService, StkDefStoreService>();
            container.RegisterType<IStkDefUnitService, StkDefUnitService>(); 
            container.RegisterType<IGenDefAdjustmentService, GenDefAdjustmentService>();
            container.RegisterType<IGenVatTypeService, GenVatTypeService>();
            container.RegisterType<IISlsTRInvoiceService, ISlsTRInvoiceService>();
            container.RegisterType<ISlsInvoiceItemsService, SlsInvoiceItemsService>();
            container.RegisterType<IAccTrReceiptService, AccTrReceiptService>();
            container.RegisterType<IIGCodesService, IGCodesService>();
            container.RegisterType<IPurTrReceiveService, PurTrReceiveService>(); 
            container.RegisterType<IPurTRReceiveItemsService, PurTRReceiveItemsService>(); 
            container.RegisterType<IPurDefChargesService, PurDefChargesService>();
            container.RegisterType<IAccTrAdjustService, AccTrAdjustService>();
            container.RegisterType<IPurTRChargesService, PurTRChargesService>();
            container.RegisterType<IProcesses, Processes>();
            container.RegisterType<IOperationItems, OperationItems>();
            container.RegisterType<IOperationCharges, OperationCharges>();
            container.RegisterType<IOperationDeposit, OperationDeposit>();
            container.RegisterType<IGLTrVoucherService, GLTrVoucherService>();
            container.RegisterType<IVoucherTypeService, VoucherTypeService>();
            container.RegisterType<IGCostCenterService, GCostCenterService>();
            container.RegisterType<IJornalHeaderService, JornalHeaderService>();
            container.RegisterType<IJournalDetailService, JournalDetailService>();
            container.RegisterType<ITmpVoucherProcessService, TmpVoucherProcessService>();
            container.RegisterType<IVchrTemplateHeaderService, VchrTemplateHeaderService>();
            container.RegisterType<IVchrTemplateDetailService, VchrTemplateDetailService>();
            container.RegisterType<IGLDefAccount_yearService, GLDefAccount_yearService>();
            container.RegisterType<IG_ControlService, G_ControlService>();
            container.RegisterType<IGRoleUsersService, GRoleUsersService>();
            container.RegisterType<IGRoleService, GRoleService>();
            container.RegisterType<IItemDefYearService, ItemDefYearService>();
            container.RegisterType<IGBRANCHService, GBRANCHService>();
            container.RegisterType<IGlnktransService, GlnktransService>();
            container.RegisterType<IGlnktransTempService, GlnktransTempService>();
            container.RegisterType<IG_LnkVarBranchService, G_LnkVarBranchService>();
            container.RegisterType<IG_SUB_SYSTEMSService, G_SUB_SYSTEMSService>();
            container.RegisterType<IG_LnkTransService, G_LnkTransService>();
            container.RegisterType<IG_LnkTransVoucherService, G_LnkTransVoucherService>();
            container.RegisterType<IDirectTransferService, DirectTransferService>();
            container.RegisterType<IG_LnkTransVariableService, G_LnkTransVariableService>();
            container.RegisterType<IG_LnkVarService, G_LnkVarService>();
            container.RegisterType<IG_USER_BRANCHService, G_USER_BRANCHService>();
            container.RegisterType<IStckAdjustService, StckAdjustService>();
            container.RegisterType<ISTKOpenService, STKOpenService>();
            container.RegisterType<IGenDefAddService, GenDefAddService>();
            container.RegisterType<IPurOrderService, PurOrderService>();
            container.RegisterType<IDefStoreService, DefStoreService>();
            container.RegisterType<ISalesTranservice, SalesTransService>();
            container.RegisterType<IVatNatureService, VatNatureService>();
            container.RegisterType<IOperationItemsSum, OperationItemsSum>();

            // Services
            container.RegisterType<IAVATSrvCategoryService, AVATSrvCategoryService>();
            container.RegisterType<IAVatDServiceService, AVatDServiceService>();
            container.RegisterType<IServiceTRInvoiceService, ServiceTRInvoiceService>();
            container.RegisterType<IServSlsInvoiceItemsService, ServSlsInvoiceItemsService>();
            container.RegisterType<IServPurInvoiceService, ServPurInvoiceService>();
            container.RegisterType<IServPurInvoiceDetailService, ServPurInvoiceDetailService>();
            container.RegisterType<IServPurInvoiceHeaderService, ServPurInvoiceHeaderService>();
            container.RegisterType<IAVATPurInvoiceRetDetailService, AVATPurInvoiceRetDetailService>();
            container.RegisterType<IAVATPurInvoiceRetService, AVATPurInvoiceRetService>();
            container.RegisterType<IOperationSalesmanItemsService, OperationSalesmanItemsService>();
            container.RegisterType<IGCompanyService, GCompanyService>();
            container.RegisterType<IG_AlertControlService, G_AlertControlService>();
            container.RegisterType<IA_CCDT_TypesService, A_CCDT_TypesService>();
            container.RegisterType<IA_CCDT_COSTCENTERSService, A_CCDT_COSTCENTERSService>();
            container.RegisterType<IAVAT_CONTROLService, AVAT_CONTROLService>();
            container.RegisterType<IAVAT_PERIODService, AVAT_PERIODService>();
            container.RegisterType<IAVATTRANSService, AVATTRANService>();
            container.RegisterType<ICashVoucherService, CashVoucherService>();
            container.RegisterType<IAVAT_D_ServiceService, AVAT_D_ServiceService>();
            container.RegisterType<II_TR_CollectService, I_TR_CollectService>();
            container.RegisterType<II_PeriodService, I_PeriodService>();
            container.RegisterType<IStk_TR_IssueToCCService, Stk_TR_IssueToCCService>();
            container.RegisterType<ILnkVoucherDetailService, LnkVoucherDetailService>();
            container.RegisterType<IACCOUNT_GROUPService, ACCOUNT_GROUPService>();
        }
    }
}