import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TuiFileLike } from '@taiga-ui/kit';
import { Apollo, Mutation } from 'apollo-angular';
import { BehaviorSubject, combineLatest, Observable, of, Subject, throwError } from 'rxjs';
import { tap, switchMap, map, timeout, takeLast, catchError, filter } from 'rxjs/operators';
import { DeveloperModeHelper } from 'src/app/components/framework/developer/developer-mode.helper';
import { ComponentMode } from 'src/app/components/framework/form-view/component-mode.enum';
import { GraphQLFormViewComponent } from 'src/app/components/framework/form-view/graphql-form-view.component';
import { BasicFormViewFormControls } from 'src/app/components/framework/form-view/_form-controls/basic-form-view.form-control';
import { Category } from 'src/app/data/models/category.model';
import { Manufacture } from 'src/app/data/models/manufacture.model';
import { Media } from 'src/app/data/models/media.model';
import { MetaData, ProductType } from 'src/app/data/models/product-type.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ProductsManagementItemChildValidation } from './products-management-item-child-form.validation';
import { MetaDataFormControl, ProductsManagementItemChildFormControl } from './_form-control/products-management-item-child-form-control';
import { CREATE_PRODUCT_TYPE } from './_grapqls/create-product-type.graphql';
import { GET_DROPDOWN_LIST } from './_grapqls/get-dropdown-list.graphql';
import { ProductsManagementItemChildPageViewModel } from './_models/products-management-item-child-page-view.model';
import { ProductsManagementItemChildViewData } from './_models/products-management-item-child-view-data.model';
import { ProductsManagementItemChildViewResult } from './_models/products-management-item-child-view-result.model';

@Component({
  selector: 'app-products-management-item-child',
  templateUrl: './products-management-item-child.component.html',
  styleUrls: ['./products-management-item-child.component.scss']
})
export class ProductsManagementItemChildComponent extends GraphQLFormViewComponent<ProductsManagementItemChildPageViewModel> implements OnInit {
  public validation: ProductsManagementItemChildValidation;

  /// --- PREPARATION FORM A MEDIA FORM
  public appMediaForm!: FormGroup;
  // get getImageResourceUrl() {
  //      var _url = this.pageViewModel$.getValue()?.profile?.profileImage?.image?.url;
  //      // // debugger;
  //      return _url;
  // }
  formMedia(): FormGroup {
       return this.appMediaForm.get('formMedia') as FormGroup;
  }
  public appCreateMediaFormGroup(
       headerControls: { [key: string]: AbstractControl },
       bodyControls: FormGroup
  ): FormGroup {
       var appFormGroup = this._formBuilder.group({
            formMedia: bodyControls
       });
       return appFormGroup;
  }
  prepareFormMediaControls(results: ProductsManagementItemChildViewResult): FormGroup {
       const bodyControl = this.scaffoldFormMediaControl(results.productTypeResult);
       const bodyFormGroup = this._formBuilder.group(bodyControl);
       return bodyFormGroup;
  }
  public scaffoldFormMediaControl(anyResult: ProductType): BasicFormViewFormControls {
       const bodyControl = {
            id: this._formBuilder.control({ value: null, disabled: false }),
            image: this._formBuilder.control({ value: null, disabled: false })
       };
       return bodyControl;
  }
  get image(): FormControl {
       var _image = this.formMedia().get('image') as FormControl;
       return _image;
  }

  constructor(
    _formBuilder: FormBuilder,
    _dev: DeveloperModeHelper,
    public _authService: AuthService,
    private apollo: Apollo,
    private route: Router
  ) {
    super(_formBuilder, _dev);

    this.pageViewModel$ = new BehaviorSubject<ProductsManagementItemChildPageViewModel>(new ProductsManagementItemChildPageViewModel);

    this.appForm = this.appCreateFormGroup({}, this.prepareFormBodyControls(
      new ProductsManagementItemChildViewResult(new ProductType())
    ));

    this.appMediaForm = this.appCreateMediaFormGroup({}, this.prepareFormMediaControls(new ProductsManagementItemChildViewResult(new ProductType())));

    this.validation = new ProductsManagementItemChildValidation(this);

  }

  override ngOnInit(): void {
    super.ngOnInit();


    const onInitDropdowns$ = combineLatest([this.items$]).pipe(
      tap(([viewData]) => {
        let viewData_ = viewData as ProductsManagementItemChildViewData;

        if (viewData_) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{ ProductTypeIdentifier: viewData_.productTypeIdentifier}
          });
        }
      }),
      switchMap(([viewData]) => {
        const appOnInit$ = this.appOnInitDropdowns(this.__MUT_VARS());
        return appOnInit$;
      })
    );

    const pipedDropdowns$ = onInitDropdowns$.pipe(
      map((onInitResult) => {
        const categories: Category[] = onInitResult.categories.map((val) => val);
        const manufactures: Manufacture[] = onInitResult.manufacture.map((val) => val);


        const _ = {
          categories,
          manufactures
        };

        return _;
      }));

    const onInitDropdowns = pipedDropdowns$.subscribe(_ => {
        const childComponentViewResult = _;

        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{
              categoriesDropdown: childComponentViewResult.categories,
              manufacturesDropdown: childComponentViewResult.manufactures
            }
          });
        }
      });

    this.subscriptions$.push(onInitDropdowns);



    const onInit$ = combineLatest([this.items$]).pipe(
        tap(([viewData]) => {


          let viewData_ = viewData as ProductsManagementItemChildViewData;

          if (viewData_) {
            this.pageViewModel$.next({ ...this.pageViewModel$.getValue(), ...{} });
          }
        }),
        switchMap(([viewData]) => {
          let viewData_ = viewData as ProductsManagementItemChildViewData;


          if (!(!!viewData_)) {
            let _tempResult = {
              productTypeResult: new ProductType()
            };
            return of(_tempResult);
          }

          let _identifier = viewData_.productTypeIdentifier ? viewData_.productTypeIdentifier : null;


          if (!(!!_identifier)) {
            let _tempResult = {
              productTypeResult: new  ProductType()
            };
            return of(_tempResult);
          }


          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(),
            ...{
              componentMode: ComponentMode.EditMode
            }
          });

          var MUT_VARS: any = this.__MUT_VARS();


          MUT_VARS.id = _identifier;

          const appOnInit$ = this.appOnInit(MUT_VARS);

          return appOnInit$;
        })
    );

    const piped$ = (onInit$).pipe(
      map((onInitResult: ProductsManagementItemChildViewResult) => {
        const _ = {
          productTypeResult: (onInitResult).productTypeResult,
        } as ProductsManagementItemChildViewResult;

        return _;

      })
    )

    const onInit = piped$.subscribe((_: ProductsManagementItemChildViewResult) => {
        const childComponentViewResult = _;


        if (!!childComponentViewResult) {
          this.pageViewModel$.next({
            ...this.pageViewModel$.getValue(), ...{
             componentResult: childComponentViewResult.productTypeResult
            }
          });


          const formBodyControls = this.prepareFormBodyControls(childComponentViewResult);


          this.appForm = this.appCreateFormGroup({}, formBodyControls);

          // console.log(this.formBody());
        }
    });

    let image$ = this.image?.valueChanges.pipe(filter(it => it)).subscribe((f) => {
      // debugger;
      // console.log(f);

      this.modifiedFiles$.next(f);
    });

    let modified$ = this.modifiedFiles$.subscribe((fileLike) => {
      // debugger;
      // console.log(fileLike);

      this.handle(fileLike);
    });

    this.subscriptions$.push(modified$);
    this.subscriptions$.push(image$);
    this.subscriptions$.push(onInit);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  prepareFormBodyControls(results: ProductsManagementItemChildViewResult): FormGroup {
    const bodyControl = this.scaffoldFormControl(results.productTypeResult);
    const bodyFormGroup = this._formBuilder.group(bodyControl);

    return bodyFormGroup;
  }

  scaffoldFormControl(anyResult: ProductType): ProductsManagementItemChildFormControl {
    const metaDataFormControl = this.scaffoldMetaDataFormControl(anyResult.metaData[0]);

    const bodyControl: ProductsManagementItemChildFormControl = {
      id: new FormControl(anyResult.id),
      name: new FormControl(anyResult.name),
      description: new FormControl(anyResult.description),
      price: new FormControl(anyResult.price),
      category: new FormControl(anyResult.categories),
      warrentyDate: new FormControl(anyResult.warrentyDate),
      metaData: this._formBuilder.group(metaDataFormControl),
    };

    return bodyControl;
  }

  scaffoldMetaDataFormControl(anyResult: MetaData): MetaDataFormControl {
    const metaDatabodyControl: MetaDataFormControl = {
      id: new FormControl(anyResult?.id),
      audio: new FormControl(anyResult?.audio),
      battery: new FormControl(anyResult?.battery),
      camera: new FormControl(anyResult?.camera),
      color: new FormControl(anyResult?.color),
      cPUSeries: new FormControl(anyResult?.cPUSeries),
      dimensions: new FormControl(anyResult?.dimensions),
      gPUSeries: new FormControl(anyResult?.gPUSeries),
      hardDrive: new FormControl(anyResult?.hardDrive),
      manufacturersId: new FormControl(anyResult?.manufacturersId),
      operatingSystem: new FormControl(anyResult?.operatingSystem),
      ports: new FormControl(anyResult?.ports),
      publishedDate: new FormControl(anyResult?.publishedDate),
      ram: new FormControl(anyResult?.ram),
      screenResolution: new FormControl(anyResult?.screenResolution),
      seriesName: new FormControl(anyResult?.seriesName),
      weight: new FormControl(anyResult?.weight),
      wLAN: new FormControl(anyResult?.wLAN),
    };

    return metaDatabodyControl;
  }

  appOnInit(MUT_VARS: any): Observable<ProductsManagementItemChildViewResult> {
    const initQuery$ = this.appQueryImpl(MUT_VARS);
    return initQuery$;
  }

  appOnInitDropdowns(MUT_VARS: { filters: {}; }) {
    const initQuery$ = this.appDropdownsQueryImpl(MUT_VARS);
    return initQuery$;
  }

  ngxOnSubmit(): void {

    const rawValue = this.appForm.getRawValue();

    let _componentMode = this.pageViewModel$.getValue().componentMode;


    const MUT_VARS = { item: rawValue.formBody };

    if (_componentMode === ComponentMode.CreateMode) {
      // Create Mode
      const appMutationImpl = this.appCreateMutationImpl(MUT_VARS);

      const appMutationImpl$ = appMutationImpl.subscribe(_ => {
        if(_) {
          console.log('add Product type success!');
          this.route.navigate(['products']);
        }
      });

      this.subscriptions$.push(appMutationImpl$);

    } else if (_componentMode === ComponentMode.EditMode) {
      // Edit Mode

      const appMutationInit2Impl = this.appUpdateMutationImpl(MUT_VARS);

      const appMutationInit2Impl$ = appMutationInit2Impl.subscribe(_ => {
        console.log('update Product type success!');
      });

      this.subscriptions$.push(appMutationInit2Impl$);
    }
  }

  appQueryImpl(vars: any) {

    const data: any[] = [];
    const result = data.find((val, elem) => {
      return vars.id === val.id;
    });

    const temp$ = {
      productTypeResult: result
    } as ProductsManagementItemChildViewResult

    return of(temp$);
  }

  appDropdownsQueryImpl(vars: any) {
    var MUT_VARS = {
      // input: {},
      // first: 0,
      // after: '',
      // last: 0,
      // before: ''
    }
    let p$ = this.apollo.query({
      query: GET_DROPDOWN_LIST,
      variables: vars
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let categories = item ? (<any>item).categories.nodes as Category[] : [];
        let manufacture = item ? (<any>item).manufacturers.nodes as Manufacture[] : [];
        return {
          categories,
          manufacture
        };
      }),
      catchError(err => {
        let errors =  err.toString().split(' ');
        let errorMessage = errors[errors.length - 1];
        return throwError(errorMessage);
      }),
    )

    return p$;
  }

  appCreateMutationImpl(vars: any) {
    const item = {
      name: vars.item.name,
      description: vars.item.description,
      price: vars.item.price,
      categoriesIds: [vars.item.category],
      warrentyDate: vars.item.warrentyDate,
      metaDatas: vars.item.metaData,
    };
    console.log(this.image.value);
    const MUT_VARS = {
      input: item,
      files: this.image.value
    }
    const token = this._authService.getToken();
    let p$ = this.apollo.mutate({
      mutation: CREATE_PRODUCT_TYPE,
      variables: MUT_VARS,
      context: {
        headers: {
          authorization: token ? `Bearer ${token}` : "",
        },
        useMultipart: true
      }
    }).pipe(
      switchMap((_) => {

        return of(_);
      }),
      map(result => {
        const item = (<any>result).data;
        let productType = item ? (<any>item)?.createProductType?.productTypes as ProductType : null;
        return {
          productType
        };
      }),
      catchError(err => {
        return throwError(err);
      }),
    )
    return p$;
  }

  appUpdateMutationImpl(vars: any) {
    const item = {
      id: vars.item.id,
      name: vars.item.name,
      description: vars.item.description,
      price: vars.item.price,
      categories: vars.item.category,
      warrentyDate: vars.item.warrentyDate,
      metaData: vars.item.metaData,
     };

    return of({});
  }

  btnClose() {
    this.route.navigate(["products"]);
  }

  btnTesting() {
    console.log(this.pageViewModel$.getValue().categoriesDropdown);
  }

  ///// ---------- TUI - FILE
  // readonly control = new FormControl();
   readonly rejectedFiles$ = new Subject<TuiFileLike | null>();
   readonly modifiedFiles$ = new Subject<TuiFileLike | null>();
   onReject(file: TuiFileLike | readonly TuiFileLike[]) {
        this.rejectedFiles$.next(file as TuiFileLike);
   }
   removeFile() {
        this.image?.setValue(null);
   }
   clearRejected() {
        this.rejectedFiles$.next(null);
   }
   handle(files: any) {
      let productTypeIdentifier = this.pageViewModel$.getValue()?.productTypeIdentifier;
      let isErrorPhoto: boolean = false;
        this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        ...{
                progressPhoto: 0
            }
        });
      let fileDone: any = [];
      // debugger;
      for (let index = 0; index < files.length; index++) {
        const file = files[index];
        let oFReader = new FileReader();
        oFReader.readAsDataURL(file);

        oFReader.onload = (oFREvent) => {
          fileDone.push(oFREvent?.target?.result);
        };


        // console.log('testing 2: ', this.pageViewModel$.getValue().photos);
      }

      this.pageViewModel$.next({
        ...this.pageViewModel$.getValue(),
        photos: fileDone,
      })
   }
   /////// END OF TUI -- FILEEE
   deletePropertyImage(photosId: string) {
    // let propertyIdentifier = this.pageViewModel$.getValue().propertyIdentifier;

    // var MUT_VARS = { id: propertyImageId, propertyId: propertyIdentifier }

    // let mutationGQL = this._appDeleteMutationInstance;
    // let mutation$ = mutationGQL.mutate(MUT_VARS);

    // let o$ = mutation$;

    // let p$ = o$.pipe(
    //      switchMap((_) => {

    //           return of(_);
    //      }),
    //      map(result => {
    //           const item = (<any>result).data;

    //           let _item = item ? (<any>item).deletePropertyImage.data : null;

    //           return _item;
    //      })
    //      ).subscribe(() => {

    //      this.items$.next(new CreateOwnSpaceStepSevenViewData(profileIdentifier, null, propertyIdentifier));

    //      let not$ = this.notificationsService
    //           .show('The property image has been deleted!', {
    //                label: 'Success',
    //                status: TuiNotification.Success
    //           })
    //      this.toasty$.next(not$);
    // });

    // return p$;
  }

public drop(event: CdkDragDrop<any>): void {
    let photos = this.pageViewModel$.value.photos || [];
    const newPhotos = photos.map((it: any) => it);
    moveItemInArray(newPhotos, event.previousContainer.data.index, event.container.data.index);
    this.pageViewModel$.value.photos = newPhotos;
}
}
