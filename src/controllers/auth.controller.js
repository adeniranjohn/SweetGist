export const authUser = async (req, res, next) => {
    try {
    
      const token = req.headers.authorization.split(" ")[1];
      if(!token){
        res.json({message: "Not Authorized"});
      }else{
            const decoded = jwt.verify(token, process.env.SECRET);
          req.user = decoded;
          next();
      }
      
    } catch (error) {
     res.json({message: "Invalid User"})
    }
  
  }