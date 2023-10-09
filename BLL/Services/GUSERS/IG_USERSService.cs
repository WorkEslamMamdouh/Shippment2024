using Inv.DAL.Domain;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;


namespace Inv.BLL.Services.GUSERS
{
    public interface IG_USERSService
    {
        G_USERS GetbyID(int id);
        List<G_USERS> GetAll();
        List<G_USERS> GetAll(Expression<Func<G_USERS, bool>> predicate);
        G_USERS Insert(G_USERS USER);
        G_USERS Update(G_USERS USER);
        Boolean CheckUser(string Guid, string uCode);
        void Delete(int id);

        G_RoleUsers InsertRoleUser(G_RoleUsers entity);
        G_RoleUsers UpdateRoleUser(G_RoleUsers entity);
        void DeleteRoleUsers(int id, string UserCodeE);

        G_USER_COMPANY InsertCompUser(G_USER_COMPANY entity);
        G_USER_BRANCH InsertBranchUser(G_USER_BRANCH entity);
        G_USER_BRANCH UpdateBranchUser(G_USER_BRANCH entity);
        void DeleteBranchUsers(int BraCode, string UserCodeE);


    }
}
