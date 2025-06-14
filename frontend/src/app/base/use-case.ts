
export interface IUseCase<TRequest, TPresenter> {
    call(request: TRequest): Promise<TPresenter> | TPresenter;
}