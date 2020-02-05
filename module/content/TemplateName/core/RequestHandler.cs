using System.Threading;
using System.Threading.Tasks;
using MediatR;

namespace TemplateName.Core
{
    public class RequestHandler : IRequestHandler<Request>
    {
        public Task<Unit> Handle(Request request, CancellationToken cancellationToken)
        {
            return Unit.Task;
        }
    }
}
