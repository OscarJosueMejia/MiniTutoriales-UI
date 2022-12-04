import { Container, CircularProgress, Dialog, Card, CardHeader, Skeleton, CardContent, DialogTitle } from "@mui/material";

export const ContentLoadingIndicator = ({mt='20vh', mb='0vh'}:{mt?:number|string, mb?:number|string}) => {
    return(
        <Container sx={{display:'flex', mt, mb, justifyContent:'center'}}>
          <CircularProgress size='3rem'/>  
        </Container>
    )
}

export const ModalLoadingIndicator = ({show}:{show:boolean}) => {
    return(
        <Dialog
        open={show}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" sx={{display:'flex', alignItems:'center'}}>
          {"Cargando..."}
          <CircularProgress size='1.5rem' sx={{ml:5}}/> 
        </DialogTitle>
      </Dialog>
    )
}

export const CardSkeleton = () => {
  return(
    <Container sx={{display:'flex', mt:'3vh', justifyContent:'space-around', flexDirection:'row', flexWrap:'wrap', alignItems:'center' }}>
      <CardSkeletonItem />
      <CardSkeletonItem />
      <CardSkeletonItem />
  </Container>
  )
}

const CardSkeletonItem = () => {
  return(
    <Card sx={{ width: '90vw', maxWidth:500, alignSelf:'center', mb:3 }}>
    <CardHeader
      avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}

      title={<Skeleton
            animation="wave"
            height={10}
            width="80%"
            style={{ marginBottom: 6 }}
          />
      }
      subheader={<Skeleton animation="wave" height={10} width="40%" />}
    />
    <Skeleton sx={{ height: 194 }} animation="wave" variant="rectangular" />

    <CardContent>
        <>
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
          <Skeleton animation="wave" height={10} width="20%" />
        </>
    </CardContent>
  </Card>
  )
} 