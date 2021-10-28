const con = require('../models/connection')

const getPhotos = (req, res) => {
    const sql = "SELECT * FROM album";
    con.query(sql, (err, result) => {
        if(err){
            res.json({
                ok: false,
                message: 'Ocurrió un error durante la lectura, por favor inténtelo nuevamente'
            })
        }
        res.json({
            ok: true,
            result
        })
    })
}

const createPhoto = (req, res) => {
    const photo = {
        albumId: req.body.albumId,
        id: req.body.id,
        title: req.body.title,
        url: req.body.url,
        thumbnailUrl: req.body.thumbnailUrl
    }

    let sql = `INSERT INTO album (albumId, id, title, url, thumbnailUrl) VALUES (${photo.albumId}, ${photo.id}, '${photo.title}', '${photo.url}', '${photo.thumbnailUrl}')`
    con.query(sql, (err, result) => {
        if (err){
            res.json({
                ok: false,
                message: 'Ocurrió un error durante la inserción, por favor inténtelo nuevamente'
            })
            throw err
        }else{
            res.json({
                ok: true,
                message: 'La foto se ha registrado exitosamente'
            })
        }
    })
}

const updatePhoto = (req, res) => {
    const sql = `SELECT * FROM album WHERE id = ${req.params.id}`
    con.query(sql, (err, result) => {
        if (err){
            res.json({
                ok: false,
                message: 'Ocurrió un error durante la lectura, por favor inténtelo nuevamente'
            })
        }else{
            resultPhoto = result[0]
            let newPhoto = {
                albumId: req.body.albumId || resultPhoto.albumId,
                id: req.body.id || resultPhoto.id, 
                title: req.body.title || resultPhoto.title,
                url: req.body.url || resultPhoto.url,
                thumbnailUrl: req.body.thumbnailUrl || resultPhoto.thumbnailUrl
            }

            const update = `UPDATE album SET albumId = ${newPhoto.albumId}, id = ${newPhoto.id}, title = '${newPhoto.title}', url = '${newPhoto.url}', thumbnailUrl = '${newPhoto.thumbnailUrl}'`
            con.query(update, (err, resUpdate) => {
                if(err){
                    res.json({
                        ok: false,
                        message: 'Ocurrió un error durante la actualización, por favor inténtelo nuevamente'
                    })
                }else {
                    res.json({
                        ok: true,
                        message: 'Los datos se han actualizado con éxito'
                    })
                }
            })
        }
    })
}

const deletePhoto = (req, res) => {
    const sql = `DELETE FROM album WHERE id = ${req.params.id}`
    con.query(sql, (err, result) => {
        if(err){
            res.json({
                ok: false,
                message: 'Ocurrió un error durante la eliminación, por favor inténtelo nuevamente'
            })
        }else{
            res.json({
                ok: true,
                message: 'Registro eliminado con éxito'
            })
        }
    })
}

module.exports = { getPhotos, createPhoto, updatePhoto, deletePhoto };