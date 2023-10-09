using System.Data.Entity.Infrastructure;



namespace Inv.DAL.Domain
{
    public partial class InvEntities
    {
        public InvEntities(string ConnectionString): base(ConnectionString)
        {
            ((IObjectContextAdapter)this).ObjectContext.CommandTimeout = 150; // seconds
        }

    }
}