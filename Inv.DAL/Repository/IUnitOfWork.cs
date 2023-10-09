namespace Inv.DAL.Repository
{
    public interface IUnitOfWork
    {
        GenericRepository<T> Repository<T>() where T : class, new();
        void Save();
    }
}
